import Image from 'next/image';
import {Transition} from '@headlessui/react';
import CanvasCard from './canvas-card';
import CanvasCardHeader from './canvas-card-header';
import {FarcasterWithMetadata, WalletWithMetadata, usePrivy} from '@privy-io/react-auth';
import {createPublicClient, getContract, http} from 'viem';
import {optimismSepolia} from 'viem/chains';
import {useEffect, useState} from 'react';
import FarcasterIcon from './icons/social/farcaster';

const NFT_CONTRACT_ADDRESS = '0x5805cf7bfCFd222fe232a1B89dF7D65A37749d6f';
const FARCASTER_DOCS_URL = 'https://docs.privy.io/guide/guides/farcaster-login';

export default function FramesCard() {
  const {user} = usePrivy();
  const [hasFramesNft, setHasFramesNft] = useState(false);

  const embeddedWallet = user?.linkedAccounts.find(
    (account) => account.type === 'wallet' && account.walletClientType === 'privy',
  ) as WalletWithMetadata | undefined;

  const farcasterAccount = user?.linkedAccounts.find(
    (account) => account.type === 'farcaster',
  ) as FarcasterWithMetadata;

  const getFramesNftOwnership = async (address: string) => {
    try {
      const publicClient = createPublicClient({
        chain: optimismSepolia,
        transport: http(),
      });
      const nft = getContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            inputs: [{internalType: 'address', name: 'owner', type: 'address'}],
            name: 'balanceOf',
            outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        client: publicClient,
      });
      const count = Number(await nft.read.balanceOf([address as `0x${string}`]));
      setHasFramesNft(count > 0);
    } catch {
      setHasFramesNft(false);
    }
  };

  useEffect(() => {
    if (!farcasterAccount || !embeddedWallet) return;
    getFramesNftOwnership(embeddedWallet.address);
  }, [farcasterAccount, embeddedWallet]);

  if (!farcasterAccount || !embeddedWallet || !hasFramesNft) return null;

  return (
    <Transition
      appear={true}
      show={true}
      enter="transition-opacity duration-[2000ms] md:duration-[4000ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <CanvasCard>
        <CanvasCardHeader>
          <FarcasterIcon height={18} width={18} />
          <div className="w-full">Farcaster Fan</div>
        </CanvasCardHeader>
        <div className="text-sm text-privy-color-foreground-3">
          Congrats! You&apos;ve unlocked this token by interacting with Privy on Farcaster Frames.
        </div>
        <div className="flex items-center justify-center pt-4 pb-4">
          <div className="relative overflow-hidden rounded-sm drop-shadow-fc-glow">
            <div className="h-48 w-64">
              <a
                href={`https://optimism-sepolia.blockscout.com/address/${embeddedWallet.address}?tab=token_transfers`}
                target="_blank"
              >
                <Image
                  src="/images/nft-asset.png"
                  alt="Your Frames NFT"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center text-xs text-privy-color-foreground-3">
            Learn about{' '}
            <a href={FARCASTER_DOCS_URL} target="_blank">
              enabling Farcaster login
            </a>
            .
          </p>
        </div>
      </CanvasCard>
    </Transition>
  );
}
