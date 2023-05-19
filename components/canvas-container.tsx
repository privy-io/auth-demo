export default function CanvasContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full overflow-hidden rounded-[12px] border border-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}
