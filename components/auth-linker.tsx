/* eslint-disable @next/next/no-img-element */
import {MinusSmallIcon, PlusSmallIcon} from '@heroicons/react/24/outline';
import {formatWallet, getHumanReadableWalletType} from '../lib/utils';
import {Wallet, usePrivy} from '@privy-io/react-auth';
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
  unlinkAction,
  socialIcon,
  className,
}: {
  wallet?: Wallet;
  isActive?: boolean;
  isLinked: boolean;
  linkedLabel?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  canUnlink: boolean;
  label?: string;
  socialIcon?: JSX.Element;
  className?: string;
}) {
  const {setActiveWallet, walletConnectors} = usePrivy();

  const getWalletType = (wallet: Wallet) => {
    const connector = walletConnectors?.walletConnectors.find(
      (wc) => wc.address === wallet.address,
    );

    if (wallet.walletClient === 'privy') {
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
          <Image
            src={`/wallet-icons/${connector?.walletType}.svg`}
            height={20}
            width={20}
            className="h-full w-full object-cover"
            alt={getHumanReadableWalletType(connector?.walletType)}
          />
        </div>
      ),
      description: `${getHumanReadableWalletType(connector?.walletType)}`,
    };
  };

  const SetActiveButton = ({wallet, isActive}: {wallet?: Wallet; isActive?: boolean}) => {
    if (wallet && isActive) {
      return (
        <div className="flex h-5 items-center justify-center rounded-md bg-gradient-to-r from-privy-color-accent to-red-300 px-1 text-xs font-medium text-white">
          Active
        </div>
      );
    }
    if (wallet && !isActive) {
      return (
        <div
          className="button h-5 shrink-0 grow-0 translate-x-2 cursor-pointer px-1 text-xs text-privy-color-foreground-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          onClick={() => setActiveWallet(wallet.address)}
        >
          Set Active
        </div>
      );
    }
    return <></>;
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
          {isLinked && wallet?.walletClient !== 'privy' ? (
            <button
              className="button h-5 w-5 text-privy-color-foreground-2"
              onClick={unlinkAction}
              disabled={!canUnlink}
            >
              <MinusSmallIcon className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : (
            <button className="button button-primary h-5 w-5" onClick={linkAction}>
              <PlusSmallIcon className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
