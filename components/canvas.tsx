export default function Canvas({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`no-scrollbar bg-dotgrid-light flex w-full items-start gap-x-8 overflow-scroll bg-privy-color-background-2 p-8 ${className}`}
    >
      {children}
    </div>
  );
}
