export default function CanvasContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full overflow-hidden rounded-[12px] border border-privy-color-foreground-4 ${className}`}
    >
      {children}
    </div>
  );
}
