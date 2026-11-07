import React from 'react';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
  gradientClass: string;
  overlayType: 'orgwise' | 'prsnclink' | 'cvdecode' | 'insightiq';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'orgwise',
    title: 'Orgwise',
    tagline: 'Timmer with leaderboard and analytics.',
    description:
      'An enterprise workforce intelligence platform with headcount, attrition, engagement, hiring analytics and org charts. Includes employee management, validated CSV imports, executive reports and role-based access control.',
    image: '/orgwise.png',
    liveUrl: 'https://orgwisee.vercel.app/',
    githubUrl: 'https://github.com/rohitmore07/orgwise',
    tags: ["Next.js","TypeScript","Recharts","NestJS","Prisma","Tailwind CSS","PostgreSQL","Neon Auth","Groq"],
    gradientClass: 'bg-linear-to-br from-white via-lime-400 to-slate-950',
    overlayType: 'orgwise',
  },
  {
    id: 'prsnclink',
    title: 'PrsncLink',
    tagline: 'Private in-browser media compressor SaaS.',
    description:
            'Digital identity platform for creating personalized professional profiles and shareable digital business cards with instant publishing, QR code sharing and PNG export.' 
            ,
    image: '/prsnclink.png',
    liveUrl: 'https://prsnclink.vercel.app/',
    githubUrl: 'https://github.com/rohitmore07/PRSNC',
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Drizzle ORM", "Neon", "OAuth", "Gemini AI"],
    gradientClass: 'bg-linear-to-br from-white via-orange-500 to-slate-950',
    overlayType: 'prsnclink',
  },
  {
    id: 'cvdecode',
    title: 'CVDecode',
    tagline: 'Create nostalgic photo cards in seconds.',
    description:
      'A retro photo card generator with customizable colors, vintage fonts, themes, dates, and captions. Create and download aesthetic photo cards.',
    image: '/cvdecode.png',
    liveUrl: 'https://cvdecode.vercel.app/',
    githubUrl: 'https://github.com/rohitmore07/CVDecode',
    tags: ["React.js, Typescript","Bun","Express","PostgreSQL","Prisma","Redis","BullMQ","Clerk","Gemini API"],
    gradientClass: 'bg-linear-to-br from-white via-rose-400 to-slate-950',
    overlayType: 'cvdecode',
  },
  {
    id: 'insightiq',
    title: 'InsightIQ',
    tagline: 'UI Components gallery',
    description:
      'A modern SaaS admin dashboard featuring authentication, user management, analytics and role-based access control.',
    image: '/insightiq.png',
    liveUrl: 'https://insight-iq-admin.vercel.app/dashboard',
    githubUrl: 'https://github.com/rohitmore07/InsightIQ',
    tags: ["Next.js", "Typescript", "Tailwind CSS", "Redux Toolkit"],
    gradientClass: 'bg-linear-to-br from-white via-sky-400 to-slate-950',
    overlayType: 'insightiq',
  },
];

export type TechCategory = 'all' | 'frontend' | 'backend' | 'design' | 'tools';

export interface TechItem {
  name: string;
  href: string;
  categories: Exclude<TechCategory, 'all'>[];
  hoverColor: string;
  iconSizeClass: string;
  renderIcon: (className: string) => React.ReactNode;
}

export const TECH_STACK: TechItem[] = [
  {
    name: 'JavaScript',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    categories: ['frontend', 'backend'],
    hoverColor: 'group-hover:text-[#F7DF1E]',
    iconSizeClass: 'text-[13px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    href: 'https://www.typescriptlang.org',
    categories: ['frontend', 'backend'],
    hoverColor: 'group-hover:text-[#3178C6]',
    iconSizeClass: 'text-[12px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
  },
  {
    name: 'React',
    href: 'https://react.dev',
    categories: ['frontend'],
    hoverColor: 'group-hover:text-[#61DAFB]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={cls}>
        <path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.7 25.5 24.3 38.7s14.8 26.8 21.3 40.6c-6.5 13.8-13.7 27.3-21.3 40.6s-15.8 26.2-24.3 38.8c-15 1.1-30.3 1.7-45.9 1.7s-31-.6-45.9-1.7c-8.5-12.6-16.7-25.5-24.4-38.8s-14.8-26.8-21.4-40.5zm180.4 51.3c5-8.6 9.8-17.3 14.3-26.1 6.4 15.2 11.9 30.1 16.3 44.5-15.3 3.3-30.8 5.8-46.4 7.5 5.5-8.5 10.7-17.2 15.8-25.9zm16.1-77.2c-4.5-8.8-9.3-17.5-14.2-26s-10.1-17.1-15.4-25.4c15.9 2 31.2 4.6 45.6 7.8-4.4 14.1-9.7 28.7-16 43.6zM256 218.2c20.7 0 37.5 16.8 37.5 37.5s-16.8 37.5-37.5 37.5-37.5-16.8-37.5-37.5 16.8-37.5 37.5-37.5z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
    categories: ['frontend', 'design'],
    hoverColor: 'group-hover:text-[#38BDF8]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    href: 'https://motion.dev',
    categories: ['frontend', 'design'],
    hoverColor: 'group-hover:text-[#F024B6]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    href: 'https://nodejs.org',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#339933]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    href: 'https://www.mongodb.com',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#47A248]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    href: 'https://www.postgresql.org',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#4169E1]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02C13.662.14 12.927 0 12.164 0 9.18 0 6.57 1.883 5.714 4.748 3.553 6.212 2.25 8.698 2.25 11.375c0 4.496 3.568 8.152 8.034 8.348-.127.674-.195 1.36-.195 2.049 0 1.227.997 2.228 2.224 2.228 1.227 0 2.224-1.001 2.224-2.228v-2.058c3.97-.39 7.087-3.758 7.087-7.839 0-1.693-.538-3.323-1.531-4.677.317-.754.482-1.563.482-2.392C20.575 2.155 19.03 0 17.128 0z" />
      </svg>
    ),
  },
  {
    name: 'Prisma',
    href: 'https://www.prisma.io',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#5A67D8]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
      </svg>
    ),
  },
  {
    name: 'OAuth',
    href: 'https://oauth.net',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#4285F4]',
    iconSizeClass: 'text-[15px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={cls}>
        <path d="M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
        <path d="M12.556 6c.65 0 1.235 .373 1.508 .947l2.839 7.848a1.646 1.646 0 0 1 -1.01 2.108a1.673 1.673 0 0 1 -2.068 -.851l-.46 -1.052h-2.73l-.398 .905a1.67 1.67 0 0 1 -1.977 1.045l-.153 -.047a1.647 1.647 0 0 1 -1.056 -1.956l2.824 -7.852a1.664 1.664 0 0 1 1.409 -1.087l1.272 -.008" />
      </svg>
    ),
  },
  {
    name: 'JWT',
    href: 'https://jwt.io',
    categories: ['backend'],
    hoverColor: 'group-hover:text-[#fb015b]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M10.2 0v6.456l1.8 2.472 1.8-2.472V0h-3.6zm3.6 24v-6.456L12 15.072l-1.8 2.472V24h3.6zM0 10.2v3.6h6.456l2.472-1.8-2.472-1.8H0zm24 3.6v-3.6h-6.456l-2.472 1.8 2.472 1.8H24zM4.776 2.232L2.232 4.776l4.56 4.56 2.904.936-.936-2.904-4.56-4.56zm14.448 19.536l2.544-2.544-4.56-4.56-2.904-.936.936 2.904 4.56 4.56zM21.768 4.776l-2.544-2.544-4.56 4.56-.936 2.904 2.904-.936 4.56-4.56zM2.232 19.224l2.544 2.544 4.56-4.56.936-2.904-2.904.936-4.56 4.56z" />
      </svg>
    ),
  },
  {
    name: 'Git',
    href: 'https://git-scm.com',
    categories: ['tools'],
    hoverColor: 'group-hover:text-[#F05032]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    href: 'https://figma.com',
    categories: ['design'],
    hoverColor: 'group-hover:text-[#F24E1E]',
    iconSizeClass: 'text-[13px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    href: 'https://www.postman.com',
    categories: ['tools'],
    hoverColor: 'group-hover:text-[#FF6C37]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268z" />
      </svg>
    ),
  },
  {
    name: 'Axios',
    href: 'https://axios-http.com',
    categories: ['frontend', 'backend'],
    hoverColor: 'group-hover:text-[#5A29E4]',
    iconSizeClass: 'text-[14px]',
    renderIcon: (cls) => (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className={cls}>
        <path d="M11.0683 2.89968V22.2973l-2.11399 1.70265V7.8638H4.975l6.0933-4.96412zM14.93426 0v15.76724H19.025l-6.20044 5.08865V1.4689L14.93426 0z" />
      </svg>
    ),
  },
];

export interface HighlightTweet {
  name: string;
  handle: string;
  avatar: string;
  text: string;
  link: string;
  pinned?: boolean;
}

export const HIGHLIGHTS: HighlightTweet[] = [
  {
    name: 'Guillermo Rauch',
    handle: 'rauchg',
    avatar: 'https://github.com/rauchg.png',
    text: 'you may have started a mini design trend',
    link: 'https://x.com/rauchg/status/1984061493785325663?s=20',
    pinned: true,
  },
  {
    name: 'Manu Arora',
    handle: 'mannupaaji',
    avatar: 'https://avatars.githubusercontent.com/u/23276437?v=4',
    text: 'Sexy',
    link: 'https://x.com/mannupaaji/status/1982504453724078282?s=20',
    pinned: true,
  },
  {
    name: '💻🎒',
    handle: 'CodingNoobie',
    avatar: 'https://i.pinimg.com/736x/d7/58/51/d75851c686f7cccaf316b9a2bc2d89d6.jpg',
    text: 'Absolutely cooking my GOAT🐐🐐🐐🐐🐐',
    link: 'https://x.com/CodingNoobie/status/2068942767162798493?s=20',
  },
  {
    name: 'Khushal',
    handle: 'Kushalpoudel_',
    avatar: 'https://i.pinimg.com/736x/ce/2a/eb/ce2aeb2da258d90a7f0bbe64251d775b.jpg',
    text: 'Bro getting so goated on design , keep doing this 🥹',
    link: 'https://x.com/Kushalpoudel_/status/1986544899035222153?s=20',
  },
  {
    name: 'NIL❄️',
    handle: '@ilspiritz',
    avatar: 'https://i.pinimg.com/736x/ae/27/df/ae27df6c8403ff92b731610022fbc711.jpg',
    text: 'The UI is so nailed on man, Comfortable, clutter free and standard. Love it dude  @samirande_',
    link: 'https://x.com/nilspiritz/status/2074775714918993940?s=20',
  },
  {
    name: 'Robin',
    handle: 'varunxtwt',
    avatar: 'https://i.pinimg.com/736x/f0/e9/46/f0e9463cb7269192079c3a2e97e4e058.jpg',
    text: 'Congratulations bro 🚀, genuinely one of the best platform, ngl it keeps me accountable.',
    link: 'https://x.com/varunxtwt/status/2070898384093987046?s=20',
  },
  {
    name: 'Quby',
    handle: 'qubydev',
    avatar: 'https://avatars.githubusercontent.com/u/107231583?v=4',
    text: 'We got @samirande_ composing a song from his portfolio site after GTA VI',
    link: 'https://x.com/qubydev/status/2074540875661844851?s=20',
  },
];

export interface OpenSourcePR {
  repo: string;
  prNumber: string;
  title: string;
  url: string;
  status: 'merged' | 'open';
  details: string[];
}

export const OPEN_SOURCE_CONTRIBUTIONS: { org: string; prs: OpenSourcePR[] }[] = [
  {
    org: 'Excalidraw',
    prs: [
      {
        repo: 'excalidraw/excalidraw',
        prNumber: '#11722',
        title: 'fix(editor): prevent eyedropper preview from overflowing viewport',
        url: 'https://github.com/excalidraw/excalidraw/pull/11722',
        status: 'merged',
        details: [
          'Clamped eyedropper color preview tooltip coordinates within viewport boundaries near screen edges.',
          'Ensured smooth pointer tracking without visual clipping on smaller displays.',
        ],
      },
      {
        repo: 'excalidraw/excalidraw',
        prNumber: '#11681',
        title: 'fix(editor): make Help button tooltip consistent with toolbar',
        url: 'https://github.com/excalidraw/excalidraw/pull/11681',
        status: 'merged',
        details: [
          'Aligned Help button tooltip styling, delay, and shortcut presentation with other toolbar actions.',
          'Improved UI polish and keyboard shortcut discoverability.',
        ],
      },
      {
        repo: 'excalidraw/excalidraw',
        prNumber: '#11727',
        title: 'feat: add one-click action to flip arrow direction',
        url: 'https://github.com/excalidraw/excalidraw/pull/11727',
        status: 'open',
        details: [
          'Implemented single-click arrow reversal in the inspector panel while preserving arrowheads and bindings.',
          'Added intuitive keyboard & toolbar ergonomics for diagramming workflows.',
        ],
      },
    ],
  },
  {
    org: 'Gluestack UI',
    prs: [
      {
        repo: 'gluestack/gluestack-ui',
        prNumber: '#3436',
        title: 'Fix/button text color theme',
        url: 'https://github.com/gluestack/gluestack-ui/pull/3436',
        status: 'open',
        details: [
          'Resolved contrast and token inheritance issues for Button text colors across light and dark themes.',
        ],
      },
    ],
  },
];

export interface BookItem {
  title: string;
  author: string;
  bgClass: string;
  textClass: string;
}

export const FAVOURITE_BOOKS: BookItem[] = [
  { title: 'Steve Jobs', author: 'Walter Isaacson', bgClass: 'bg-[#F5F5F5] dark:bg-[#1C1C1C]', textClass: 'text-neutral-950 dark:text-white' },
  { title: 'Almanack of Naval Ravikant', author: 'Eric Jorgenson', bgClass: 'bg-[#1E1E1E]', textClass: 'text-white' },
  { title: 'The Stranger', author: 'Albert Camus', bgClass: 'bg-[#262322]', textClass: 'text-neutral-100' },
  { title: 'Red Rising', author: 'Pierce Brown', bgClass: 'bg-[#2B1515]', textClass: 'text-rose-100' },
  { title: 'The Courage to Be Disliked', author: 'Ichiro Kishimi & Fumitake Koga', bgClass: 'bg-[#1A2228]', textClass: 'text-sky-100' },
  { title: 'Meditations', author: 'Marcus Aurelius', bgClass: 'bg-[#23211C]', textClass: 'text-amber-100' },
  { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', bgClass: 'bg-[#19191B]', textClass: 'text-neutral-200' },
  { title: 'The Rudest Book Ever', author: 'Shwetabh Gangwar', bgClass: 'bg-[#241D26]', textClass: 'text-purple-100' },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', bgClass: 'bg-[#172426]', textClass: 'text-teal-100' },
];
