export default function WalletButton({
  icon,
  label,
  className,
  children,
}: {
  type?: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-10 items-center gap-x-2 rounded-md border border-gray-300 px-3 ${className}`}
    >
      <div className="shrink-0 grow-0">{icon}</div>
      <div className="w-full text-sm">{label}</div>
      {children}
    </div>
  );
}
