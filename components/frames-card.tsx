import Image from 'next/image';
import {Transition} from '@headlessui/react';
import CanvasCard from './canvas-card';
import CanvasCardHeader from './canvas-card-header';
import {ArrowUpOnSquareIcon} from '@heroicons/react/24/outline';
import {usePrivy} from '@privy-io/react-auth';

export default function FramesCard() {
  const {ready, authenticated, exportWallet} = usePrivy();

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-[2000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <CanvasCard>
        <CanvasCardHeader>
          <span className="h-5 w-5">🖼️</span>
          <div className="w-full">Celebrating Frames</div>
        </CanvasCardHeader>
        <div className="text-sm text-privy-color-foreground-3">
          Collect the NFT you minted on Warpcast below by exporting your wallet to take it
          elsewhere.
        </div>
        <div className="flex items-center justify-center py-6">
          <div className="relative overflow-hidden rounded-sm drop-shadow-2xl">
            <div className="h-48 w-48">
              <Image
                src="/images/nft-asset.webp"
                alt="Your Warpcast NFT"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="button h-10 w-full gap-x-1 text-sm"
            disabled={!(ready && authenticated)}
            onClick={exportWallet}
          >
            <ArrowUpOnSquareIcon className="h-4 w-4" strokeWidth={2} />
            Export Embedded wallet
          </button>
        </div>
      </CanvasCard>
    </Transition>
  );
}
