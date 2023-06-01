import {ArrowRightIcon} from '@heroicons/react/24/outline';
import PrivyLogo from './privy-logo';

export function Header() {
  return (
    <header className="flex shrink-0 grow-0 items-center py-5">
      <div className="grow-1 flex w-full items-center gap-x-2">
        <PrivyLogo className="text-privy-color-foreground-1 h-[22px] w-[70px]" />
        <div className="text-medium flex h-[22px] items-center justify-center rounded-[11px] border border-privy-color-accent px-[0.375rem] text-[0.75rem] text-privy-color-accent">
          Demo
        </div>
      </div>

      <div className="flex h-[34px] shrink-0 grow-0 items-center gap-x-4 rounded-[17px] bg-privy-color-background-2 pl-4 pr-1 text-[14px]">
        Privy takes 9 minutes to set up
        {/* <p className="text-privy-color-accent underline hover:cursor-pointer hover:text-privy-color-accent">
                <Link href="/gallery">Gallery</Link>
              </p> */}
        <a
          href="https://docs.privy.io/guide/quickstart"
          target="_blank"
          rel="noreferrer"
          className="button button-primary h-[26px] gap-x-2 rounded-[13px] px-3 text-[14px] text-white"
        >
          Get started now
          <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
        </a>
        {/* <button
                onClick={login}
                className="button hidden h-[26px] rounded-[13px] px-3 lg:block"
              >
                Log in to try it out
              </button> */}
      </div>
    </header>
  );
}
