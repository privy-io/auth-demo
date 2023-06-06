/* eslint-disable @next/next/no-img-element */
import {MinusSmallIcon, PlusSmallIcon, LinkIcon} from '@heroicons/react/24/outline';
import {formatWallet, getHumanReadableWalletType} from '../lib/utils';
import type {WalletWithMetadata} from '@privy-io/react-auth';
import type React from 'react';
import Image from 'next/image';

export default function AuthLinker({
  wallet,
  label,
  linkAction,
  linkedLabel,
  canUnlink,
  isLinked,
  isActive,
  setActiveWallet,
  unlinkAction,
  socialIcon,
  walletConnectorName,
  isConnected,
  connectAction,
  className,
}: {
  wallet?: WalletWithMetadata;
  isActive?: boolean;
  setActiveWallet?: (wallet: WalletWithMetadata) => void;
  isLinked: boolean;
  linkedLabel?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  canUnlink: boolean;
  label?: string;
  socialIcon?: JSX.Element;
  walletConnectorName?: string;
  isConnected?: boolean;
  connectAction?: (address: string) => void;
  className?: string;
}) {
  const isEmbeddedWallet = wallet?.walletClient === 'privy';

  const getWalletType = (wallet: WalletWithMetadata) => {
    if (isEmbeddedWallet) {
      return {
        address: formatWallet(wallet.address),
        icon: (
          <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0 overflow-hidden rounded-[0.25rem]">
            <Image
              src="/logos/privy-logomark.png"
              height={20}
              width={20}
              className="h-full w-full object-cover"
              alt={'embedded'}
            />
          </div>
        ),
        description: 'Embedded',
      };
    }

    return {
      address: formatWallet(wallet.address),
      icon: (
        <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0 overflow-hidden rounded-[0.25rem]">
          {walletConnectorName ? (
            <Image
              src={`/wallet-icons/${walletConnectorName}.svg`}
              height={20}
              width={20}
              className="h-full w-full object-cover"
              alt={getHumanReadableWalletType(walletConnectorName as any)}
            />
          ) : (
            <LinkIcon className="h-4 w-4 text-privy-color-foreground" strokeWidth={2} />
          )}
        </div>
      ),
      description: `${getHumanReadableWalletType(walletConnectorName as any)}`,
    };
  };

  const SetActiveButton = ({
    wallet,
    isActive,
  }: {
    wallet?: WalletWithMetadata;
    isActive?: boolean;
  }) => {
    if (wallet && isActive) {
      return (
        <div className="flex h-5 items-center justify-center rounded-md bg-gradient-to-r from-privy-color-accent to-red-300 px-1 text-xs font-medium text-white">
          Active
        </div>
      );
    }
    if (wallet && !isConnected) {
      return (
        <div
          className="group/tooltip button h-5 shrink-0 grow-0 translate-x-2 cursor-pointer px-1 text-xs text-privy-color-foreground-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          onClick={() => connectAction?.(wallet.address)}
        >
          Connect
          <div className="absolute bottom-0 mb-6 hidden flex-col items-center group-hover/tooltip:flex">
            <span className="whitespace-no-wrap relative z-10 w-[156px] rounded-md bg-privy-color-foreground p-2 text-xs leading-[1.1rem] text-privy-color-background shadow-lg">
              Re-connect this wallet to use it.
            </span>
            <div className="-mt-2 h-3 w-3 rotate-45 bg-privy-color-foreground"></div>
          </div>
        </div>
      );
    }
    if (wallet && !isActive) {
      return (
        <div
          className="button h-5 shrink-0 grow-0 translate-x-2 cursor-pointer px-1 text-xs text-privy-color-foreground-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          onClick={() => setActiveWallet?.(wallet)}
        >
          Set Active
        </div>
      );
    }
    return <></>;
  };

  const LinkButton = (isLinked: boolean) => {
    if (isEmbeddedWallet) return <></>;
    if (isLinked) {
      return (
        <button
          className="button group/tooltip relative flex h-5 w-5 flex-col items-center text-privy-color-foreground-2"
          onClick={unlinkAction}
          disabled={!canUnlink}
        >
          <MinusSmallIcon className="h-4 w-4" strokeWidth={2} />
          {!canUnlink && (
            <div className="absolute bottom-0 mb-6 hidden flex-col items-center group-hover/tooltip:flex">
              <span className="whitespace-no-wrap relative z-10 w-[156px] rounded-md bg-privy-color-foreground p-2 text-xs leading-[1.1rem] text-privy-color-background shadow-lg">
                This wallet is connected but not linked.
              </span>
              <div className="-mt-2 h-3 w-3 rotate-45 bg-privy-color-foreground"></div>
            </div>
          )}
        </button>
      );
    }
    return (
      <button className="button button-primary h-5 w-5" onClick={linkAction}>
        <PlusSmallIcon className="h-4 w-4" strokeWidth={2} />
      </button>
    );
  };

  return (
    <>
      <div
        className={`group flex h-10 min-w-full items-center justify-between gap-x-3 rounded-md border bg-privy-color-background px-3 text-sm ${
          isActive ? 'border-privy-color-accent' : 'border-privy-color-foreground-4'
        } ${className}`}
      >
        <div className="flex shrink-0 grow-0 items-center gap-x-2">
          {socialIcon ? socialIcon : null}
          {wallet ? getWalletType(wallet).icon : null}
          {label ? <div className="w-full">{label}</div> : null}
        </div>

        {isLinked && linkedLabel ? (
          <div className="w-full justify-end truncate text-right text-privy-color-foreground-3">
            {linkedLabel}
          </div>
        ) : null}

        <div className="flex shrink-0 grow-0 flex-row items-center justify-end gap-x-1">
          <SetActiveButton wallet={wallet} isActive={isActive} />
          {LinkButton(isLinked)}
        </div>
      </div>
    </>
  );
}
