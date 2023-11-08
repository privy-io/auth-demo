export default function TwitterXIcon({
  className,
  height = 24,
  width = 24,
}: {
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <svg width={width} height={height} className={className} fill="none" viewBox="-4 -4 32 32">
      <path
        fill="currentColor"
        d="M 14.285156 10.171875 L 23.222656 0 L 21.105469 0 L 13.34375 8.832031 L 7.148438 0 L 0 0 L 9.371094 13.355469 L 0 24.019531 L 2.117188 24.019531 L 10.308594 14.691406 L 16.851562 24.019531 L 24 24.019531 M 2.878906 1.5625 L 6.132812 1.5625 L 21.101562 22.535156 L 17.851562 22.535156 "
      />
    </svg>
  );
}
