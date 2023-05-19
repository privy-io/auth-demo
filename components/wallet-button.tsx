export default function WalletButton({
  type,
  icon,
  label,
  className,
}: {
  type?: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  const Control: React.FC = (): React.ReactElement => {
    if (type === 'radio') {
      return (
        <input
          className="shrink-0 grow-0 border-gray-300 text-privurple focus:ring-privurple"
          type="radio"
          name="wallet"
          value={label}
        />
      );
    } else if (type === 'checkbox') {
      return (
        <input
          className="shrink-0 grow-0 rounded border-gray-300 text-privurple focus:ring-privurple"
          type="checkbox"
          name="wallet"
          value={label}
        />
      );
    } else if (type === 'button') {
      return (
        <button className="shrink-0 grow-0 " type="button">
          {label}
        </button>
      );
    }
    return <></>;
  };

  return (
    <div
      className={`flex h-10 items-center gap-x-2 rounded-md border border-gray-300 px-3 ${className}`}
    >
      <div className="shrink-0 grow-0">{icon}</div>
      <div className="w-full text-sm">{label}</div>
      <Control />
    </div>
  );
}
