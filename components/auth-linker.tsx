import type React from 'react';

export type AuthLinkerProps = {
  unlinkedText?: string | null;
  linkedText?: string | null;
  linkAction: () => void;
  unlinkAction: () => void;
  isLink: boolean;
  canUnlink: boolean;
  // Optional content placed aligned left, to the right of the main text
  additionalInfo?: React.ReactNode;
};

export function LinkButton(props: {onClick: () => void}) {
  return (
    <button
      className="min-w-[60px] max-w-[60px] rounded-md bg-privurple py-1 px-2 text-sm text-white transition-all hover:bg-privurpleaccent"
      onClick={props.onClick}
    >
      Link
    </button>
  );
}

function UnlinkButton(props: {disabled?: boolean; onClick: () => void}) {
  return (
    <button
      className="min-w-[60px] max-w-[60px] rounded-md border border-privurple border-opacity-0 py-1 px-2 text-sm text-privurple transition-all hover:border-privurpleaccent hover:border-opacity-100 hover:text-privurpleaccent disabled:cursor-not-allowed disabled:border-slate-400 disabled:text-slate-400 hover:disabled:text-slate-400"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      Unlink
    </button>
  );
}

export function AuthSection(props: {
  text: string;
  action: React.ReactNode;
  additionalInfo?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-full items-center justify-between gap-10 rounded-xl bg-white px-3 py-3">
      <div className="flex items-center gap-3 text-sm">
        <p>{props.text}</p>
        {props.additionalInfo}
      </div>
      <div className="flex flex-row items-center">{props.action}</div>
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
  additionalInfo,
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
      additionalInfo={additionalInfo}
    />
  );
}
