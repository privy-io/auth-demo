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
      className="min-w-[80px] max-w-[80px] text-sm bg-privurple bg-opacity-90 hover:bg-opacity-100 py-2 px-4 rounded-md text-white transition-all ml-3"
      onClick={props.onClick}
    >
      Link
    </button>
  );
}

function UnlinkButton(props: {disabled?: boolean; onClick: () => void}) {
  return (
    <button
      className="min-w-[80px] max-w-[80px] text-sm border border-privurple hover:border-privurpleaccent py-2 px-4 rounded-md text-privurple hover:text-privurpleaccent disabled:border-slate-500 disabled:text-slate-500 hover:disabled:text-slate-500 disabled:cursor-not-allowed transition-all ml-3"
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
    <div className="flex justify-between items-center gap-10 min-w-full px-3 py-3 rounded-xl bg-white">
      <div className="flex items-center text-sm gap-3">
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
