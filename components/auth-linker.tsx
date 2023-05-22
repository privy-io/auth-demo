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
  isEmbeddedWallet,
  className,
}: {
  wallet?: Wallet;
  label?: string;
  linkedLabel?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  isLinked: boolean;
  isActive?: boolean;
  canUnlink: boolean;
  // Optional content placed aligned left, to the right of the main text
  isEmbeddedWallet?: boolean;
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
          <div className="h-5 w-5 shrink-0 grow-0 overflow-hidden rounded-md">
            <img
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
        <div className="h-5 w-5 shrink-0 grow-0 overflow-hidden rounded-md">
          <img
            src={`/wallet-icons/${connector?.walletType}.svg`}
            className="h-full w-full object-cover"
            layout="fill"
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
        <div className="flex h-5 items-center justify-center rounded-md bg-privy-color-success px-1 text-xs text-white">
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
          isActive ? 'border-privy-color-success' : 'border-privy-color-foreground-4'
        } ${className}`}
      >
        {wallet ? getWalletType(wallet).icon : null}
        {label ? <div className="w-full">{label}</div> : null}
        {isLinked && linkedLabel ? (
          <div className="max-w-[7.5rem] shrink-0 grow-0 truncate text-privy-color-foreground-3">
            {linkedLabel}
          </div>
        ) : null}

        {isEmbeddedWallet && (
          <span className="flex items-center gap-1 rounded-md bg-privy-color-background-2 px-2 py-1 text-xs">
            embedded
          </span>
        )}
        <div className="flex flex-row items-center justify-end gap-x-1">
          <SetActiveButton wallet={wallet} isActive={isActive} />
          {isLinked ? (
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
