import type React from 'react';

export type AuthLinkerProps = {
  unlinkedText?: string | null;
  linkedText?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  isLink: boolean;
  canUnlink: boolean;
};

export function LinkButton(props: {onClick: () => void}) {
  return (
    <button
      className="min-w-[80px] max-w-[80px] text-sm bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
      onClick={props.onClick}
    >
      Link
    </button>
  );
}

function UnlinkButton(props: {disabled?: boolean; onClick: () => void}) {
  return (
    <button
      className="min-w-[80px] max-w-[80px] text-sm border border-coral hover:border-coralaccent py-2 px-4 rounded-md text-coral hover:text-coralaccent disabled:border-slate-500 disabled:text-slate-500 hover:disabled:text-slate-500 disabled:cursor-not-allowed"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Unlink
    </button>
  );
}

export function AuthSection(props: {text: string; action: React.ReactNode}) {
  return (
    <div className="flex justify-between items-center gap-10 min-w-full p-4 rounded-xl bg-white">
      <div className="h-[48px] max-h-[50px] flex items-center text-sm">
        <p>{props.text}</p>
      </div>
      {props.action}
    </div>
  );
}

export default function AuthLinker({
  linkAction,
  linkedText,
  unlinkedText,
  canUnlink,
  isLink,
  unlinkAction,
}: AuthLinkerProps) {
  return (
    <AuthSection
      text={(isLink ? linkedText : unlinkedText) as string}
      action={
        isLink ? (
          <UnlinkButton onClick={unlinkAction} disabled={!canUnlink} />
        ) : (
          <LinkButton onClick={linkAction} />
        )
      }
    />
  );
}
