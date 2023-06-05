export default function CanvasContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-[12px] border-privy-color-foreground-4 md:h-full md:flex-row md:overflow-hidden md:border ${className}`}
    >
      {children}
    </div>
  );
}
