export default function CanvasCardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`flex items-center gap-x-2 pb-2 text-sm ${className}`}>{children}</div>;
}
