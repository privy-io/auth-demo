import {ArrowRightIcon} from '@heroicons/react/24/outline';
import PrivyLogo from './privy-logo';

export function Header() {
  return (
    <header className="flex shrink-0 grow-0 flex-col items-center gap-y-8 py-5 md:flex-row">
      <div className="grow-1 flex w-full items-center gap-x-2">
        <PrivyLogo className="text-privy-color-foreground-1 h-[22px] w-[70px]" />
        <div className="text-medium flex h-[22px] items-center justify-center rounded-[11px] border border-privy-color-accent px-[0.375rem] text-[0.75rem] text-privy-color-accent">
          Demo
        </div>
      </div>

      <div className="hidden shrink-0 grow-0 flex-col items-center gap-x-4 gap-y-2 rounded-[17px] pl-4 pr-1 text-[14px] md:flex md:h-[34px] md:flex-row md:bg-privy-color-background-2">
        Privy takes 9 minutes to set up
        <a
          href="https://privy.io/signup"
          target="_blank"
          rel="noreferrer"
          className="button button-primary flex items-center gap-x-2 rounded-[13px] px-3 py-2 text-[14px] text-white md:py-0"
        >
          Get started now
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </header>
  );
}
