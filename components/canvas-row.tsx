export default function CanvasRow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex w-full shrink-0 grow-0 flex-col items-center justify-center gap-y-6 md:w-72 ${className}`}
    >
      {children}
    </div>
  );
}
