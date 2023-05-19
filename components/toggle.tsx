export default function Toggle({checked = false}: {checked: boolean}) {
  return (
    <div className="flex items-center">
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
