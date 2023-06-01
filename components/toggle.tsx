import {classNames} from '../lib/classNames';

export default function Toggle({
  checked = false,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={classNames('flex items-center', disabled ? 'opacity-50' : '')}
      onClick={() => {
        if (disabled) return;
        onChange(!checked);
      }}
    >
      <div
        className={`relative h-[0.875rem] w-7 cursor-pointer select-none rounded-full transition-all duration-300 ease-in-out ${
          checked
            ? 'justify-start bg-privy-color-accent'
            : 'justify-end bg-privy-color-foreground-4'
        }`}
      >
        <div
          className={`toggle-checkbox absolute top-1/2 m-0 block h-[0.625rem] w-[0.625rem] -translate-y-1/2 rounded-full p-0 transition-all duration-300 ease-in-out ${
            checked
              ? 'left-0.5 right-auto bg-privy-color-background'
              : 'left-[calc(100%-0.75rem)] bg-privy-color-foreground-3'
          }`}
        />
      </div>
    </div>
  );
}
