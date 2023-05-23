export default function CanvasSidebar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`no-scrollbar flex h-full w-[24rem] shrink-0 grow-0 flex-col overflow-y-scroll border-r border-privy-color-foreground-4 bg-privy-color-background ${className}`}
    >
      {children}
    </div>
  );
}
