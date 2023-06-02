export default function Canvas({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`md:no-scrollbar md:bg-dotgrid-light flex w-full flex-col items-start gap-y-8 gap-x-8 py-8 md:flex-row md:overflow-scroll md:bg-privy-color-background-2 md:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
