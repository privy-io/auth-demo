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
  const socialsCount = [user.discord, user.github, user.google, user.twitter, user.apple].filter(
    Boolean,
  ).length;

  return (
    <div className="text-sm">
      <div className="flex flex-col gap-3 rounded-xl bg-white p-5">
        {/* TODO: Once user.wallet is fixed, use that again */}
        {walletCount ? (
          <div className="flex items-center gap-2">
            <BlobbyIconFull size={20} />
            <p>{walletCount === 1 ? 'has a wallet' : `has ${walletCount} wallets`}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked a wallet</p>
          </div>
        )}
        {user.phone ? (
          <div className="flex items-center gap-2">
            <BlobbyIconFull size={20} />
            <p>has a phone</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked a phone</p>
          </div>
        )}
        {user.email ? (
          <div className="flex items-center gap-2">
            <BlobbyIconFull size={20} />
            <p>has an email</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked an email</p>
          </div>
        )}
        {socialsCount ? (
          <div className="flex items-center gap-2">
            <BlobbyIconFull size={20} />
            <p>
              has linked{' '}
              {socialsCount === 1 ? 'a social account' : `${socialsCount} social accounts`}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked a social account</p>
          </div>
        )}
      </div>
    </div>
  );
}
