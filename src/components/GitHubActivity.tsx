import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const DARK_COLORS = ['#1a1a1a', '#525252', '#8c8c8c', '#a7a7a7', '#ebebeb'];
const LIGHT_COLORS = ['#ebebeb', '#adadad', '#848484', '#4a4a4a', '#1a1a1a'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function generateFallbackContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = (d.getFullYear() * 31 + d.getMonth() * 17 + d.getDate() * 13) % 19;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;
    if (seed > 15) {
      level = 4;
      count = 9 + (seed % 5);
    } else if (seed > 12) {
      level = 3;
      count = 6 + (seed % 3);
    } else if (seed > 8) {
      level = 2;
      count = 3 + (seed % 3);
    } else if (seed > 4) {
      level = 1;
      count = 1 + (seed % 2);
    }
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level,
    });
  }
  return days;
}

export const GitHubActivity: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[] | null>(null);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.classList.contains('dark'));
    };
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    fetch('https://github-contributions-api.jogruber.de/v4/rohitmore07?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data?.contributions) && data.contributions.length > 0) {
          setContributions(data.contributions);
        } else {
          setContributions(generateFallbackContributions());
        }
      })
      .catch(() => {
        if (active) setContributions(generateFallbackContributions());
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !contributions) return;
    const scrollToEnd = () => {
      el.scrollLeft = el.scrollWidth;
    };
    scrollToEnd();
    const ro = new ResizeObserver(scrollToEnd);
    ro.observe(el);
    return () => ro.disconnect();
  }, [contributions]);

  const { weeks, monthLabels, totalCount } = useMemo(() => {
    if (!contributions || contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalCount: 0 };
    }
    const total = contributions.reduce((acc, d) => acc + d.count, 0);
    const firstDate = new Date(contributions[0].date + 'T00:00:00');
    const startPadding = firstDate.getDay();

    const padded: (ContributionDay | null)[] = [
      ...Array.from({ length: startPadding }, () => null),
      ...contributions,
    ];
    while (padded.length % 7 !== 0) {
      padded.push(null);
    }

    const weekCols: (ContributionDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weekCols.push(padded.slice(i, i + 7));
    }

    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weekCols.forEach((col, wIdx) => {
      const firstValid = col.find((d) => d !== null);
      if (firstValid) {
        const m = new Date(firstValid.date + 'T00:00:00').getMonth();
        if (m !== lastMonth) {
          labels.push({ label: MONTH_NAMES[m], weekIndex: wIdx });
          lastMonth = m;
        }
      }
    });

    return { weeks: weekCols, monthLabels: labels, totalCount: total };
  }, [contributions]);

  const palette = isLightTheme ? LIGHT_COLORS : DARK_COLORS;

  if (!contributions) {
    return (
      <div className="w-full overflow-x-auto scrollbar-hide flex justify-start md:justify-center">
        <div className="w-[800px] p-2 flex flex-col gap-2 animate-pulse">
          <div className="flex justify-between px-2 text-[10px] text-transparent select-none">
            {MONTH_NAMES.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {Array.from({ length: 53 }).map((_, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((__, dIdx) => (
                  <div
                    key={dIdx}
                    className="w-[11px] h-[11px] rounded-[2px] dark:bg-neutral-200 bg-neutral-800"
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-2 px-1">
            <div className="h-3 w-32 dark:bg-neutral-200 bg-neutral-800 rounded" />
            <div className="h-3 w-24 dark:bg-neutral-200 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto scrollbar-hide scroll-smooth flex justify-start md:justify-center"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="w-[800px] p-2 flex flex-col items-center font-inter select-none">
        {/* Month Header */}
        <div className="relative w-full h-4 mb-1.5 text-[11px] text-neutral-400 dark:text-neutral-500">
          {monthLabels.map((m, idx) => (
            <span
              key={`${m.label}-${idx}`}
              style={{ left: `${m.weekIndex * 14 + 14}px` }}
              className="absolute top-0"
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* 53x7 Contribution Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((day, dIdx) => {
                if (!day) {
                  return <div key={dIdx} className="w-[11px] h-[11px]" />;
                }
                const bg = palette[day.level] ?? palette[0];
                return (
                  <div
                    key={day.date}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    title={`${day.count} contributions on ${day.date}`}
                    style={{ backgroundColor: bg }}
                    className="w-[11px] h-[11px] rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-pointer"
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer: Total count / hovered day + Legend */}
        <div className="w-full flex justify-between items-center mt-2.5 px-3 text-[12px] text-neutral-400 dark:text-neutral-600">
          <span>
            {hoveredDay
              ? `${hoveredDay.count} contribution${hoveredDay.count === 1 ? '' : 's'} on ${hoveredDay.date}`
              : `${totalCount.toLocaleString()} contributions in the last year`}
          </span>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            {palette.map((color, idx) => (
              <span
                key={idx}
                style={{ backgroundColor: color }}
                className="w-[11px] h-[11px] rounded-[2px] inline-block"
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};
