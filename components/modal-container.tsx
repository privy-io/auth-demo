import {MegaphoneIcon} from '@heroicons/react/24/outline';
import {usePrivy} from '@privy-io/react-auth';

export default function ModalContainer({className}: {className?: string}) {
  const {login} = usePrivy();

  return (
    <div
      className={`flex h-[38.75rem] w-[22.5rem] shrink-0 grow-0 flex-col rounded-[1.625rem] border border-gray-300 bg-white p-6 shadow-xl ${className}`}
    >
      <div className="shrink-0 grow-0 pb-4 text-xl">Welcome to privy</div>
      <div className="shrink-0 grow-0 pb-2 text-sm text-gray-600">
        Privy Auth is a simple toolkit for progressive authentication in web3.
      </div>
      <div className="shrink-0 grow-0 pb-10 text-sm text-gray-600">
        Engage your users in web3 within seconds, whether they start with wallet, email or social,
        on desktop and mobile.
      </div>
      <div className="shrink-0 grow-0 rounded-lg bg-gray-100 p-4 text-sm">
        <div className="inline-flex h-[1.375rem] items-center gap-x-1 rounded-full bg-gradient-to-r from-indigo-400 to-red-300 px-2 text-xs font-medium text-white">
          <MegaphoneIcon className="h-4 w-4" strokeWidth={2} />
          Hot of the Press
        </div>
        <a
          href="https://lighthouse.mirror.xyz/zq6Tb_YD__KIhvCLhT5M8bOnA43W3peUJa9LYnviiwY"
          className="block pt-2 text-privurple no-underline hover:cursor-pointer hover:text-privurpleaccent"
          target="_blank"
          rel="noreferrer"
        >
          Learn how we partnered with Lighthouse!
        </a>
      </div>
      <div className="flex h-full items-end pt-4">
        <button onClick={login} className="button-primary h-12 w-full rounded-lg px-4 text-sm">
          Start the Demo
        </button>
      </div>
    </div>
  );
}
