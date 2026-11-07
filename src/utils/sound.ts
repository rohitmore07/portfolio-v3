
let sharedAudioCtx: AudioContext | null = null;

// Get or create a shared AudioContext
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioCtx) return null;

    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }

    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Initialize audio
export function initializeAudio(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state !== "running") {
    ctx.resume().catch((error) => {
      console.warn("Audio initialization failed:", error);
    });
  }
}

// Unlock audio after the first user interaction
export function setupAudioUnlock(): () => void {
  if (typeof window === "undefined") return () => {};

  const unlock = () => {
    const ctx = getAudioContext();
    if (!ctx || ctx.state === "running") return;

    // Resume directly during the user interaction.
    ctx.resume().catch((error) => {
      console.warn("Audio unlock failed:", error);
    });
  };

  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock);

  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };
}

// Piano frequencies
export const TECH_PIANO_FREQUENCIES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0,  // A5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
  1567.98, // G6
  1760.0, // A6
  2093.0, // C7
];

// Play a piano-style note
export function playNote(
  frequency = 440,
  duration = 0.08
): void {
  try {
    const ctx = getAudioContext();

    if (!ctx || ctx.state !== "running") return;

    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch (error) {
    console.warn("Note playback failed:", error);
  }
}

// Short pop sound
export function playPopSound(
  frequency = 1000,
  duration = 0.045
): void {
  try {
    const ctx = getAudioContext();

    if (!ctx || ctx.state !== "running") return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(
      0.8 * frequency,
      now + duration
    );

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.value = 0.7;

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + duration
    );

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.01);
  } catch {
    // Ignore audio errors
  }
}

// Camera shutter sound
export function playShutterSound(): void {
  try {
    const ctx = getAudioContext();

    if (!ctx || ctx.state !== "running") return;

    const bufferSize = Math.floor(0.1 * ctx.sampleRate);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = 2 * Math.random() - 1;
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();

    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);

    const triggerClick = (
      startTime: number,
      hpFreq: number,
      bpFreq: number,
      qVal: number,
      peakGain: number,
      len: number,
      pan = 0
    ) => {
      const src = ctx.createBufferSource();
      src.buffer = buffer;

      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = hpFreq;

      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = bpFreq;
      bp.Q.value = qVal;

      const env = ctx.createGain();

      env.gain.setValueAtTime(0.0001, startTime);
      env.gain.linearRampToValueAtTime(
        peakGain,
        startTime + 0.001
      );
      env.gain.exponentialRampToValueAtTime(
        0.0001,
        startTime + len
      );

      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;

      src.connect(hp);
      hp.connect(bp);
      bp.connect(env);
      env.connect(panner);
      panner.connect(masterGain);

      src.start(startTime);
      src.stop(startTime + len + 0.005);
    };

    triggerClick(now, 5000, 7500, 3.5, 0.25, 0.008, -0.08);
    triggerClick(now + 0.045, 6000, 6000, 3, 0.18, 0.009, 0.08);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.045);

    oscGain.gain.setValueAtTime(0.035, now);
    oscGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.045
    );

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.045);
  } catch {
    // Ignore audio errors
  }
}
