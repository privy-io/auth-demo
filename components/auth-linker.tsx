import {MinusSmallIcon, PlusSmallIcon} from '@heroicons/react/24/outline';
import type React from 'react';

export function LinkButton(props: {onClick: () => void}) {
  return (
    <button className="button button-primary h-5 w-5" onClick={props.onClick}>
      <PlusSmallIcon className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

function UnlinkButton(props: {disabled?: boolean; onClick: () => void}) {
  return (
    <button
      className="button h-5 w-5 text-privy-color-foreground-2"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <MinusSmallIcon className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}

export default function AuthLinker({
  linkAction,
  linkedText,
  unlinkedText,
  canUnlink,
  isLink,
  isActive,
  unlinkAction,
  additionalInfo,
  isEmbeddedWallet,
  className,
}: {
  unlinkedText?: string | null;
  linkedText?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  isLink: boolean;
  isActive: boolean;
  canUnlink: boolean;
  // Optional content placed aligned left, to the right of the main text
  additionalInfo?: React.ReactNode;
  isEmbeddedWallet?: boolean;
  className?: string;
}) {
  return (
    <>
      <div
        className={`flex h-10 min-w-full items-center justify-between gap-10 rounded-md border bg-privy-color-background px-3 ${
          isActive ? 'border-privy-color-success' : 'border-privy-color-foreground-4'
        } ${className}`}
      >
        <div className="flex items-center gap-3 text-sm">
          <p>{isLink ? linkedText : unlinkedText}</p>
          {additionalInfo}

          {isEmbeddedWallet && (
            <span className="flex items-center gap-1 rounded-md bg-privy-color-background-2 px-2 py-1 text-xs">
              embedded
            </span>
          )}
        </div>
        <div className="flex flex-row items-center">
          {isLink ? (
            <UnlinkButton onClick={unlinkAction} disabled={!canUnlink} />
          ) : (
            <LinkButton onClick={linkAction} />
          )}
        </div>
      </div>
    </>
  );
}
