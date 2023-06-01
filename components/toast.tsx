import {ExclamationTriangleIcon, CheckCircleIcon} from '@heroicons/react/24/outline';
import LoaderIcon from './icons/outline/loader';

export const DismissableError = ({
  message,
  clickHandler,
}: {
  message: string;
  clickHandler?: () => void | null;
}) => {
  return (
    <div className="my-2 flex min-w-full justify-between rounded-md bg-privy-color-background-2 py-2 pl-4 pr-2">
      <div className="flex flex-row items-center gap-2 text-sm text-privy-color-error">
        <ExclamationTriangleIcon className="h-4 w-4 text-privy-color-error" aria-hidden="true" />
        {message}
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="button border-transparent px-2 text-xs text-privy-color-foreground-2"
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
    <div className="my-2 flex min-w-full justify-between rounded-md bg-privy-color-background-2 py-2 pl-4 pr-2">
      <div className="flex flex-row items-center gap-2 text-sm text-privy-color-success">
        <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
        {message}
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="button border-transparent px-2 text-xs text-privy-color-foreground-2"
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
    <div className="my-2 flex min-w-full justify-between rounded-md bg-privy-color-background-2 py-2 pl-4 pr-2">
      <div className="flex flex-row items-center gap-2 text-sm text-privy-color-foreground-3">
        <LoaderIcon
          className="h-5 w-5 animate-spin text-privy-color-foreground-3"
          aria-hidden="true"
          strokeWidth={2}
        />
        <p>{message}</p>
      </div>
      {clickHandler && (
        <button
          type="button"
          onClick={clickHandler}
          className="button border-transparent px-2 text-xs text-privy-color-foreground-2"
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
