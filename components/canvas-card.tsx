export default function CanvasCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full rounded-xl border border-privy-color-foreground-4 bg-privy-color-background p-4 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
