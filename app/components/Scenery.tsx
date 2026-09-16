/**
 * 「なぜ作るのか」の章に置く線画。山と木立、牛舎、牛。
 * 地名は書かない（掲載方針：市町村は書かない）。色は深緑1色を、濃さだけ変えて使う。
 */
export default function Scenery({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 150"
      role="img"
      aria-label="山と木立、牛舎と牛の線画"
      className={className}
      preserveAspectRatio="xMidYMax meet"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* 奥の山なみ */}
        <path
          d="M0 104 C48 62 96 50 148 66 C196 80 220 44 268 34 C318 24 348 56 396 70 C446 84 482 46 534 40 C586 34 616 74 640 92"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <path
          d="M0 118 C56 96 104 104 156 92 C214 78 246 100 302 96 C368 90 404 60 462 70 C524 80 570 108 640 104"
          strokeWidth="1.5"
          opacity="0.45"
        />

        {/* 照葉樹の木立 */}
        <g strokeWidth="1.8" opacity="0.8">
          <path d="M84 126 v-20" />
          <path d="M84 106 c-17 0 -27 -11 -27 -21 c0 -12 12 -20 27 -20 c15 0 27 8 27 20 c0 10 -10 21 -27 21 z" />
          <path d="M130 126 v-14" />
          <path d="M130 112 c-12 0 -19 -8 -19 -15 c0 -9 9 -15 19 -15 c10 0 19 6 19 15 c0 7 -7 15 -19 15 z" />
          <path d="M556 126 v-17" />
          <path d="M556 109 c-15 0 -24 -10 -24 -18 c0 -11 11 -18 24 -18 c13 0 24 7 24 18 c0 8 -9 18 -24 18 z" />
          <path d="M596 126 v-12" />
          <path d="M596 114 c-10 0 -16 -7 -16 -13 c0 -8 7 -13 16 -13 c9 0 16 5 16 13 c0 6 -6 13 -16 13 z" />
        </g>

        {/* 牛舎 */}
        <g strokeWidth="1.9">
          <path d="M216 126 v-36" />
          <path d="M300 126 v-36" />
          <path d="M210 91 l48 -25 l48 25" />
          <path d="M248 126 v-22 h20 v22" />
        </g>

        {/* 牛（右向き） */}
        <g strokeWidth="1.9">
          <rect x="360" y="82" width="72" height="30" rx="15" />
          <path d="M434 88 c12 0 20 6 22 13 c2 8 -4 15 -13 15 c-11 0 -18 -7 -18 -15 c0 -7 3 -13 9 -13 z" />
          <path d="M432 89 c-5 -4 -4 -11 2 -11 c4 0 6 2 7 5" />
          <path d="M452 112 c4 -1 6 -4 6 -7" />
          <path d="M372 126 v-14 M390 126 v-14 M410 126 v-14 M426 126 v-14" />
          <path d="M360 88 c-8 3 -11 11 -7 18" />
          <circle cx="446" cy="99" r="1.4" fill="currentColor" stroke="none" />
        </g>

        {/* 地面 */}
        <path d="M0 126 h640" strokeWidth="1.5" opacity="0.55" />
      </g>
    </svg>
  );
}
