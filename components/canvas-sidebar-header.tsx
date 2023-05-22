export default function CanvasSidebarHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-x-2 border-b border-privy-color-foreground-4 pt-6 pb-2 text-[1rem] ${className}`}
    >
      {children}
    </div>
  );
}
