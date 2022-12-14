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
    <div className="flex justify-between items-center p-4 min-w-full rounded bg-gray-200">
      <p>{isLink ? linkedText : unlinkedText}</p>
      {isLink ? (
        <button
          onClick={() => {
            unlinkAction();
          }}
          className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700 disabled:border-gray-500 disabled:text-gray-500 hover:disabled:text-gray-500"
          disabled={!canRemove}
        >
          {unlinkCta}
        </button>
      ) : (
        <button
          onClick={() => {
            linkAction();
          }}
          className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
        >
          {linkCta}
        </button>
      )}
    </div>
  );
}
