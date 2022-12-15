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
    <div className="flex -sm:flex-col justify-between items-center min-w-full p-4 rounded-xl bg-white border border-lightgray gap-2">
      <p>{isLink ? linkedText : unlinkedText}</p>
      {isLink ? (
        <button
          onClick={() => {
            unlinkAction();
          }}
          className="min-w-[120px] max-w-[150px] text-sm border border-coral hover:border-coralaccent py-2 px-4 rounded-md text-coral hover:text-coralaccent disabled:border-slate-500 disabled:text-slate-500 hover:disabled:text-slate-500 disabled:cursor-not-allowed"
          disabled={!canRemove}
        >
          {unlinkCta}
        </button>
      ) : (
        <button
          onClick={() => {
            linkAction();
          }}
          className="min-w-[120px] max-w-[150px] text-sm bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
        >
          {linkCta}
        </button>
      )}
    </div>
  );
}
