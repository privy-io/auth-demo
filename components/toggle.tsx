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
        className={`flex h-[0.875rem] w-7 cursor-pointer select-none items-center rounded-full pl-0.5 align-middle ${
          checked ? 'justify-start bg-privurple' : 'justify-end bg-gray-300'
        }`}
      >
        <div
          className={`toggle-checkbox bg-priv m-0 block h-[0.625rem] w-[0.625rem] rounded-full p-0 ${
            checked ? 'bg-white' : 'bg-gray-400'
          }`}
        />
      </div>
    </div>
  );
}
