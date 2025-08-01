export function SubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 104 104"
    >
      <defs>
        <rect id="path-1" width="90" height="72" x="0" y="0" rx="10" />
        <filter
          id="filter-2"
          width="152.2%"
          height="165.3%"
          x="-26.1%"
          y="-27.1%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology in="SourceAlpha" radius="0.25" result="shadowSpreadOuter1" />
          <feOffset dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1" />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feMorphology in="SourceAlpha" radius="1" result="shadowSpreadOuter2" />
          <feOffset dy="2" in="shadowSpreadOuter2" result="shadowOffsetOuter2" />
          <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="4" />
          <feColorMatrix
            in="shadowBlurOuter2"
            result="shadowMatrixOuter2"
            values="0 0 0 0 0.098466735 0 0 0 0 0.0599695403 0 0 0 0 0.0599695403 0 0 0 0.07 0"
          />
          <feMorphology in="SourceAlpha" radius="2" result="shadowSpreadOuter3" />
          <feOffset dy="4" in="shadowSpreadOuter3" result="shadowOffsetOuter3" />
          <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="8" />
          <feColorMatrix
            in="shadowBlurOuter3"
            result="shadowMatrixOuter3"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="shadowMatrixOuter2" />
            <feMergeNode in="shadowMatrixOuter3" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
        <g>
          <use fill="#000" filter="url(#filter-2)" xlinkHref="#path-1" />
          <use fill="#F0F2F5" xlinkHref="#path-1" />
        </g>
        <path fill="#FFF" d="M26 0h55c5.523 0 10 4.477 10 10v8H26V0z" />
        <path fill="#001529" d="M10 0h19v72H10C4.477 72 0 67.523 0 62V10C0 4.477 4.477 0 10 0z" />
        <rect width="14" height="3" x="5" y="18" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="14" height="3" x="5" y="42" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="9" height="3" x="9" y="24" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="9" height="3" x="9" y="48" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="9" height="3" x="9" y="36" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="14" height="3" x="9" y="30" fill="#D7DDE6" opacity="0.2" rx="1.5" />
        <rect width="14" height="3" x="9" y="54" fill="#D7DDE6" opacity="0.2" rx="1.5" />
      </g>
    </svg>
  );
}
