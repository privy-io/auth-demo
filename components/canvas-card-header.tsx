export default function CanvasCardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-x-2 pb-2 text-sm text-privy-color-foreground-2 ${className}`}
    >
      {children}
    </div>
  );
}
