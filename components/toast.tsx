import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';

export const DismissableError = ({
  message,
  clickHandler,
}: {
  message: string;
  clickHandler?: () => void | null;
}) => {
  return (
    <div className="my-2 flex min-w-full justify-between rounded-md bg-red-50 px-4 py-2 text-red-800">
      <div className="flex flex-row items-center gap-2 text-sm">
        <ExclamationCircleIcon className="h-4 w-4 text-red-400" aria-hidden="true" />
        <p>{message}</p>
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="ml-3 rounded-md bg-red-50 px-2 text-xs text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export const DismissableSuccess = ({
  message,
  clickHandler,
}: {
  message: string;
  clickHandler?: () => void | null;
}) => {
  return (
    <div className="my-2 flex min-w-full justify-between rounded-md bg-green-50 px-4 py-2 text-green-800">
      <div className="flex flex-row items-center gap-2 text-sm">
        <CheckCircleIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
        <p>{message}</p>
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="ml-3 rounded-md bg-green-50 px-2 text-xs text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};

export const DismissableInfo = ({
  message,
  clickHandler,
}: {
  message: string;
  clickHandler?: () => void | null;
}) => {
  return (
    <div className="my-2 flex min-w-full justify-between rounded-md bg-slate-50 px-4 py-2 text-slate-800">
      <div className="flex flex-row items-center gap-2 text-sm">
        <InformationCircleIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
        <p>{message}</p>
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="ml-3 rounded-md bg-slate-50 px-2 text-xs text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
