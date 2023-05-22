export default function LoaderIcon({
  className,
  height = 24,
  width = 24,
  strokeWidth = 1.5,
}: {
  className?: string;
  height?: number;
  width?: number;
  strokeWidth?: number;
}) {
  return (
    <svg className={className} width={height} height={width} viewBox="0 0 24 24" fill="none">
      <path
        d="M19.9997 11.9994H17.4734M17.6566 17.6562L15.8702 15.8699M11.9683 19.9993L11.978 17.473M6.32131 17.6345L8.11416 15.8547M4 11.9365L6.52623 11.956M6.38239 6.30336L8.15573 8.10265M12.0939 4L12.0646 6.52613M17.7154 6.40198L15.9096 8.16877"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
