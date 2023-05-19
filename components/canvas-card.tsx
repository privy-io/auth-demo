export default function CanvasCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full rounded-xl border border-gray-300 bg-white p-4 shadow-lg ${className}`}>
      {children}
    </div>
  );
}
