export default function ThumbsDownSvg({ selected, stColor, bgColor, modal }) {
  return (
    <svg
      width={30}
      height={30}
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill={selected ? (modal ? " #fff" : "#000") : bgColor || "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.472 3.5H4.1a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6h2.768a2 2 0 0 1 1.715.971l2.71 4.517a1.631 1.631 0 0 0 2.961-1.308l-1.022-3.408a.6.6 0 0 1 .574-.772h4.575a2 2 0 0 0 1.93-2.526l-1.91-7A2 2 0 0 0 16.473 3.5Z"
        stroke={stColor || "#fff"}
        strokeLinecap="round"
      />
      <path
        d="M7 14.5v-11"
        stroke={selected ? (modal ? "#000" : "#fff") : stColor || "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
