import BlobbyIcon from './blobby-icon';
import BlobbyIconFull from './blobby-icon-full';

const SUPPORTED_WALLET_TYPES = ['metamask', 'coinbase_wallet', 'wallet_connect'] as const;
type WalletType = typeof SUPPORTED_WALLET_TYPES[number];

/** @ignore */
interface LinkMetadata {
  /** Account type, most commonly useful when filtering through linkedAccounts */
  type: 'wallet' | 'email' | 'phone' | 'google_oauth' | 'twitter_oauth' | 'discord_oauth';
  /** Datetime when this account was linked to the user. */
  verifiedAt: Date;
}

/**
 * Object representation of a user's wallet.
 */
interface Wallet {
  /** The wallet address. */
  address: string;
  /** Chain type of the wallet address. */
  chainType: 'ethereum' | 'solana';
  chainId?: string;
  walletType?: WalletType;
}

/** Object representation of a user's email. */
interface Email {
  address: string;
}

/** Object representation of a user's phone number. */
interface Phone {
  number: string;
}

/** Object representation of a user's Google account. */
interface Google {
  /** The `sub` claim from the Google-issued JWT for this account. */
  subject: string;
  /** The email associated with the Google account. */
  email: string;
  /** The name associated with the Google account. */
  name: string | null;
}

/** Object representation of a user's Twitter account. */
interface Twitter {
  /** The `sub` claim from the Twitter-issued JWT for this account. */
  subject: string;
  /** The username associated with the Twitter account. */
  username: string | null;
  /** The name associated with the Twitter account. */
  name: string | null;
}

/** Object representation of a user's Discord account. */
interface Discord {
  /** The `sub` claim from the Discord-issued JWT for this account. */
  subject: string;
  /** The username associated with the Discord account.  */
  username: string | null;
  /** The email associated with the Discord account. */
  email: string | null;
}

/** Object representation of a user's email, with additional metadata for advanced use cases. */
interface EmailWithMetadata extends LinkMetadata, Email {
  /** Denotes that this is an email account. */
  type: 'email';
}

/** Object representation of a user's phone number, with additional metadata for advanced use cases. */
interface PhoneWithMetadata extends LinkMetadata, Phone {
  /** Denotes that this is a phone account. */
  type: 'phone';
}

/** Object representation of a user's wallet, with additional metadata for advanced use cases. */
interface WalletWithMetadata extends LinkMetadata, Wallet {
  /** Denotes that this is a wallet account. */
  type: 'wallet';
}

/** Object representation of a user's Google Account, with additional metadata for advanced use cases. */
interface GoogleOAuthWithMetadata extends LinkMetadata, Google {
  /** Denotes that this is a Google account. */
  type: 'google_oauth';
}

/** Object representation of a user's Twitter Account, with additional metadata for advanced use cases. */
interface TwitterOAuthWithMetadata extends LinkMetadata, Twitter {
  /** Denotes that this is a Twitter account. */
  type: 'twitter_oauth';
}

/** Object representation of a user's Discord Account, with additional metadata for advanced use cases. */
interface DiscordOAuthWithMetadata extends LinkMetadata, Discord {
  /** Denotes that this is a Discord account. */
  type: 'discord_oauth';
}

interface User {
  /** The Privy-issued DID for the user. If you need to store additional information
   * about a user, you can use this DID to reference them. */
  id: string;
  /** The datetime of when the user was created. */
  createdAt: Date;
  /** The user's email address, if they have linked one. It cannot be linked to another user. */
  email?: Email;
  /** The user's phone number, if they have linked one. It cannot be linked to another user. */
  phone?: Phone;
  /** The user's wallet address, if they have linked one. It cannot be linked to another user. */
  wallet?: Wallet;
  /** The user's Google account, if they have linked one. It cannot be linked to another user. */
  google?: Google;
  /** The user's Twitter account, if they have linked one. It cannot be linked to another user. */
  twitter?: Twitter;
  /** The user's Discord account, if they have linked one. It cannot be linked to another user. */
  discord?: Discord;
  /** The list of accounts associated with this user. Each account contains additional metadata
   * that may be helpful for advanced use cases. */
  linkedAccounts: Array<
    | WalletWithMetadata
    | EmailWithMetadata
    | PhoneWithMetadata
    | GoogleOAuthWithMetadata
    | TwitterOAuthWithMetadata
    | DiscordOAuthWithMetadata
  >;
}

export type UserBoxProps = {
  user: User;
};
export default function UserBox({user}: UserBoxProps) {
  return (
    <div className="flex gap-2">
      <div className="p-2 rounded-xl bg-white min-w-[250px] border border-lightgray">
        {user.wallet ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has a wallet</p>
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
            <p>has linked google</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked google</p>
          </div>
        )}
        {user.twitter ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has linked twitter</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked twitter</p>
          </div>
        )}
        {user.discord ? (
          <div className="flex gap-2 items-center">
            <BlobbyIconFull size={20} />
            <p>has linked discord</p>
          </div>
        ) : (
          <div className="flex gap-2 items-center opacity-30">
            <BlobbyIcon size={20} />
            <p>hasn&rsquo;t linked discord</p>
          </div>
        )}
      </div>
    </div>
  );
}
