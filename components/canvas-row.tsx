export default function CanvasRow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex w-72 shrink-0 grow-0 flex-col items-center justify-center gap-y-6 ${className}`}
    >
      {children}
    </div>
  );
}
