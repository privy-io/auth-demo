export default function CanvasSidebar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`md:no-scrollbar flex w-full shrink-0 grow-0 flex-col overflow-y-scroll bg-privy-color-background md:h-full md:w-[24rem] md:border-r md:border-privy-color-foreground-4 ${className}`}
    >
      {children}
    </div>
  );
}
