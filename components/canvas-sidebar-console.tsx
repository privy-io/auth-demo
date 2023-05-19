export default function CanvasSidebarConsole({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`no-scrollbar flex h-full w-[24rem] shrink-0 grow-0 flex-col overflow-y-scroll border-r border-gray-300 bg-white ${className}`}
    >
      {children}
    </div>
  );
}
