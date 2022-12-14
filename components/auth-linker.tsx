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
    <div className="flex justify-between items-center p-4 min-w-full rounded-xl bg-white border-2 border-gray-800 gap-2">
      <p>{isLink ? linkedText : unlinkedText}</p>
      {isLink ? (
        <button
          onClick={() => {
            unlinkAction();
          }}
          className="min-w-[250px] text-sm border border-slate-700 hover:border-black py-2 px-4 rounded-md text-slate-700 hover:text-black disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
          disabled={!canRemove}
        >
          {unlinkCta}
        </button>
      ) : (
        <button
          onClick={() => {
            linkAction();
          }}
          className="min-w-[250px] text-sm bg-slate-800 hover:bg-slate-900 py-2 px-4 rounded-md text-white"
        >
          {linkCta}
        </button>
      )}
    </div>
  );
}