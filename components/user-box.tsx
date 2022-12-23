import BlobbyIcon from './blobby-icon';
import BlobbyIconFull from './blobby-icon-full';
import type {User} from '@privy-io/react-auth';

export type UserBoxProps = {
  user: User;
};

export default function UserBox({user}: UserBoxProps) {
  const walletCount = user.linkedAccounts.reduce(
    (count, account) => count + Number(account.type === 'wallet'),
    0,
  );

  return (
    <div className="text-sm">
      <div className="flex flex-col gap-3 p-5 rounded-xl bg-white">
        {user.wallet ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>{walletCount === 1 ? 'has a wallet' : `has ${walletCount} wallets`}</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked a wallet</p>
          </div>
        )}
        {user.phone ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has a phone</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked a phone</p>
          </div>
        )}
        {user.email ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has a email</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked an email</p>
          </div>
        )}
        {user.google ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has linked Google</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked Google</p>
          </div>
        )}
        {user.twitter ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has linked Twitter</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked Twitter</p>
          </div>
        )}
        {user.discord ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has linked Discord</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked Discord</p>
          </div>
        )}
      </div>
    </div>
  );
}
