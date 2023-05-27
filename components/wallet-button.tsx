export default function WalletButton({
  icon,
  label,
  className,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <label
      className={`flex h-10 cursor-pointer items-center gap-x-2 rounded-md border border-privy-color-foreground-4 px-3 ${className}`}
    >
      <div className="shrink-0 grow-0">{icon}</div>
      <div className="w-full text-sm">{label}</div>
      {children}
    </label>
  );
}
