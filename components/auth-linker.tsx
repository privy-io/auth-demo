export type AuthLinkerProps = {
  unlinkedText: string;
  linkedText: string;
  linkCta: string;
  unlinkCta: string;
  linkAction: Function;
  unlinkAction: Function;
  isLink: boolean;
  canRemove: boolean;
};

export default function AuthLinker({
  unlinkedText,
  linkedText,
  linkCta,
  unlinkCta,
  linkAction,
  canRemove,
  isLink,
  unlinkAction,
}: AuthLinkerProps) {
  return (
    <div className="flex -sm:flex-col justify-between items-center p-4 min-w-full rounded-xl bg-white border-2 border-lightgray gap-2">
      {isLink ? (
        <button
          onClick={() => {
            unlinkAction();
          }}
          className="min-w-[150px] max-w-[150px] text-sm border border-coral hover:border-coralaccent py-2 px-4 rounded-md text-coral hover:text-coralaccent disabled:border-slate-500 disabled:text-slate-500 hover:disabled:text-slate-500"
          disabled={!canRemove}
        >
          {unlinkCta}
        </button>
      ) : (
        <button
          onClick={() => {
            linkAction();
          }}
          className="min-w-[150px] max-w-[150px] text-sm bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
        >
          {linkCta}
        </button>
      )}
      <p align="right">{isLink ? linkedText : unlinkedText}</p>
    </div>
  );
}
