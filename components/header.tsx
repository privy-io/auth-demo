import {ArrowRightIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';

export function Header() {
  return (
    <header className="flex shrink-0 grow-0 items-center py-5">
      <div className="grow-1 flex w-full items-center gap-x-2">
        <Image src="/logos/navbar-logo.svg" height={22} width={70} alt="Privy" />
        <div className="text-medium flex h-[22px] items-center justify-center rounded-[11px] border border-privurpleaccent px-[0.375rem] text-[0.75rem] text-privurpleaccent">
          Demo
        </div>
      </div>

      <div className="flex h-[34px] shrink-0 grow-0 items-center gap-x-4 rounded-[17px] bg-gray-100 pl-4 pr-1 text-[14px]">
        Privy takes 9 minutes to set up
        {/* <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p> */}
        <a
          href="https://docs.privy.io/guide/quickstart"
          target="_blank"
          rel="noreferrer"
          className="button-primary h-[26px] gap-x-2 rounded-[13px] px-3 text-[14px]"
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
