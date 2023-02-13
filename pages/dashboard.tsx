import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {useState, useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import type {WalletWithMetadata} from '@privy-io/react-auth';
import Head from 'next/head';
import Loading from '../components/loading';
import UserBox from '../components/user-box';
import AuthLinker, {LinkButton, AuthSection} from '../components/auth-linker';
import {clearDatadogUser} from '../lib/datadog';

const formatWallet = (address: string | undefined): string => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, 8);
  const last = address.slice(address.length - 4, address.length);
  return `${first}...${last}`;
};

const DismissableInfo = ({message, onClick_}: {message: string; onClick_?: () => void | null}) => {
  return (
    <div className="bg-green-200 px-4 py-2 my-2 rounded flex min-w-full justify-between">
      <p>{message}</p>
      {onClick_ && (
        <p className="hover:cursor-pointer underline" onClick={onClick_}>
          dismiss
        </p>
      )}
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const [signLoading, setSignLoading] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);

  const {
    ready,
    authenticated,
    user,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    linkPhone,
    unlinkPhone,
    unlinkWallet,
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    setActiveWallet,
    unlinkDiscord,
    walletConnectors,
    linkGithub,
    unlinkGithub,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      clearDatadogUser();
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const linkedAccounts = user?.linkedAccounts || [];

  const wallets = linkedAccounts.filter((a) => a.type === 'wallet') as WalletWithMetadata[];

  const numAccounts = linkedAccounts.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const emailAddress = user?.email?.address;
  const phoneNumber = user?.phone?.number;

  const googleSubject = user?.google?.subject;
  const googleName = user?.google?.name;

  const twitterSubject = user?.twitter?.subject;
  const twitterUsername = user?.twitter?.username;

  const discordSubject = user?.discord?.subject;
  const discordUsername = user?.discord?.username;

  const githubSubject = user?.github?.subject;
  const githubUsername = user?.github?.username;

  if (!ready || !authenticated || !user) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="min-h-screen relative min-w-screen overflow-hidden bg-privy-light-blue p-8 sm:p-10">
        <div className="sm:hidden">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl">Privy Auth Demo</h1>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:block">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl">Privy Auth Demo</h1>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                  Docs
                </a>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io/guide/setup" target="_blank" rel="noreferrer">
                  Get started now
                </a>
              </p>
              <button
                onClick={logout}
                className="bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mt-16 gap-10 -sm:grid-cols-1 -sm:mt-10">
          <div>
            <h2 className="font-bold text-privy-navy text-xl md:text-2xl">Engage your users</h2>
            <p className="text-sm min-h-[60px] mt-4">
              With just a few lines of code, you can easily prompt your users to link different
              accounts and safely take on credentials.
            </p>
            <h3 className="font-bold text-privy-navy text-lg mt-5 lg:mt-1">Wallets</h3>
            <div className="flex flex-col gap-2 mt-5">
              {wallets.map((wallet) => (
                <AuthLinker
                  key={wallet.address}
                  isLink
                  linkedText={formatWallet(wallet.address)}
                  canUnlink={canRemoveAccount}
                  unlinkAction={() => {
                    unlinkWallet(wallet.address);
                  }}
                  linkAction={linkWallet}
                />
              ))}
              <AuthSection text="Link a wallet" action={<LinkButton onClick={linkWallet} />} />
            </div>

            <h3 className="font-bold text-privy-navy text-lg mt-8">Email / SMS / Social</h3>

            <div className="flex flex-col gap-2 mt-5">
              <AuthLinker
                unlinkedText="Link an email account"
                linkedText={`Email ${emailAddress}`}
                canUnlink={canRemoveAccount}
                isLink={!!emailAddress}
                unlinkAction={() => {
                  unlinkEmail(emailAddress as string);
                }}
                linkAction={linkEmail}
              />

              <AuthLinker
                unlinkedText="Link a phone number"
                linkedText={`Phone number ${phoneNumber}`}
                canUnlink={canRemoveAccount}
                isLink={!!phoneNumber}
                unlinkAction={() => {
                  unlinkPhone(phoneNumber as string);
                }}
                linkAction={linkPhone}
              />

              <AuthLinker
                unlinkedText="Link a Google account"
                linkedText={`Google user ${googleName}`}
                canUnlink={canRemoveAccount}
                isLink={!!googleSubject}
                unlinkAction={() => {
                  unlinkGoogle(googleSubject as string);
                }}
                linkAction={linkGoogle}
              />

              <AuthLinker
                unlinkedText="Link a Twitter account"
                linkedText={`Twitter user ${twitterUsername}`}
                canUnlink={canRemoveAccount}
                isLink={!!twitterSubject}
                unlinkAction={() => {
                  unlinkTwitter(twitterSubject as string);
                }}
                linkAction={linkTwitter}
              />

              <AuthLinker
                unlinkedText="Link a Discord account"
                linkedText={`Discord user ${discordUsername}`}
                canUnlink={canRemoveAccount}
                isLink={!!discordSubject}
                unlinkAction={() => {
                  unlinkDiscord(discordSubject as string);
                }}
                linkAction={linkDiscord}
              />

              <AuthLinker
                unlinkedText="Link a Github account"
                linkedText={`Github user ${githubUsername}`}
                canUnlink={canRemoveAccount}
                isLink={!!githubSubject}
                unlinkAction={() => {
                  unlinkGithub(githubSubject as string);
                }}
                linkAction={linkGithub}
              />
            </div>

            {canRemoveAccount ? null : (
              <p className="text-slate-400 text-sm mt-4 px-1">
                Note that if the user only has one account, you cannot unlink it.
              </p>
            )}
          </div>

          <div>
            <h2 className="font-bold text-privy-navy text-xl md:text-2xl">
              Build a rich user object
            </h2>
            <p className="text-sm min-h-[60px] mt-4">
              Privy gives you modular components so you can customize your product for your users.
              Learn more in{' '}
              <a
                href="https://docs.privy.io/guide/users/object"
                target="_blank"
                rel="noreferrer"
                className="underline text-privurple hover:text-privurpleaccent"
              >
                our docs
              </a>
              .
            </p>
            <h3 className="font-bold text-privy-navy text-lg mt-5 lg:mt-1">JSON</h3>
            <div className="mt-5">
              <textarea
                value={JSON.stringify(user, null, 2)}
                className="min-w-full p-5 bg-white text-privy-navy font-mono text-xs rounded-xl border-0"
                rows={JSON.stringify(user, null, 2).split('\n').length}
                disabled
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <h2 className="font-bold text-xl md:text-2xl text-privy-navy">
              Work with responsive UI
            </h2>
            <p className="text-sm min-h-[60px] mt-4">
              You decide when to engage users, we take care of the how. Connect within seconds,
              seriously.
            </p>
            <h3 className="font-bold text-privy-navy text-lg mt-5 lg:mt-1">
              Authenticated accounts
            </h3>
            <div className="mt-5">
              <UserBox user={user} />
            </div>

            <h3 className="mt-10 font-bold text-privy-navy text-lg">Active wallet</h3>
            <p>
              If your user has at least one wallet linked, then they have an active wallet.
              <br />
              You can use the active wallet to perform on-chain actions like signing or
              transactions.
            </p>

            {signSuccess && (
              <DismissableInfo
                message="Signature was successful"
                onClick_={() => setSignSuccess(false)}
              />
            )}
            {signLoading ? (
              <DismissableInfo message="Waiting for signature" />
            ) : (
              <div className="flex justify-between items-center min-w-full px-4 py-2 rounded-xl bg-white my-4">
                {user.wallet && (
                  <p>
                    <span className="font-bold">Active wallet:</span>{' '}
                    {formatWallet(user.wallet.address)}
                  </p>
                )}
                <button
                  className="bg-coral hover:bg-coralaccent m-2 py-2 px-4 rounded-md text-white"
                  onClick={() => {
                    setSignSuccess(false);
                    setSignLoading(true);
                    walletConnectors
                      ?.activeWalletSign(
                        'Signing with the active wallet in Privy: ' +
                          walletConnectors?.activeWalletConnector?.address,
                      )
                      .then(() => {
                        setSignSuccess(true);
                        setSignLoading(false);
                      });
                  }}
                >
                  Sign
                </button>
              </div>
            )}
            {walletConnectors?.walletConnectors &&
              walletConnectors.walletConnectors.map((walletConnector) => {
                const addr = walletConnector.address as string;
                if (addr == user?.wallet?.address) {
                  return <div key={addr}></div>;
                } else {
                  return (
                    <p key={addr}>
                      {formatWallet(addr)}
                      <button
                        className="bg-coral hover:bg-coralaccent m-2 py-2 px-4 rounded-md text-white"
                        onClick={() => {
                          setActiveWallet(addr);
                        }}
                      >
                        make active
                      </button>
                    </p>
                  );
                }
              })}
          </div>
        </div>
      </main>
    </>
  );
}
