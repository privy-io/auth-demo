import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';
import Loading from '../components/loading';
import UserBox from '../components/user-box';
import AuthLinker from '../components/auth-linker';

const formatWallet = (address: string | undefined): string => {
  if (!address) {
    return '';
  }
  return address.slice(0, 7);
};

export default function LoginPage() {
  const router = useRouter();
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
    unlinkDiscord,
  } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const numAccounts = user?.linkedAccounts?.length || 0;
  const canRemoveAccount = numAccounts > 1;

  const email = user?.email;
  const phone = user?.phone;
  const wallet = user?.wallet;

  const googleSubject = user?.google?.subject || null;
  const twitterSubject = user?.twitter?.subject || null;
  const discordSubject = user?.discord?.subject || null;

  if (!ready || !authenticated || !user) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      {/* add back bg-privy-blue later*/}
      <main className="flex flex-col min-h-screen relative min-w-screen bg-privy-light-blue">
        <div id="header" className="fixed top-0 left-0 bg-red-300 p-10 min-w-full">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Privy Auth Demo</h1>
              <p>
                You are now authenticated with Privy! You can see the user object, and its linked
                accounts, on the right.
              </p>
              <p>
                Try linking and unlinking accounts below, and watch the user object dynamically
                change.
              </p>
            </div>
            <UserBox user={user} />
            <button
              onClick={logout}
              className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div id="columns" className="grid grid-cols-2 mt-60 p-10">
          <div className="p-4 bg-gray-800 flex flex-col gap-4 flex-wrap bg-gray-100 items-center">
            <AuthLinker
              unlinkedText="Collect their email to send them personalized notifications!"
              linkedText={`This user has a valid email linked: ${email?.address}!`}
              canRemove={canRemoveAccount}
              isLink={!!email}
              linkCta="Link an email"
              unlinkCta={`Unlink ${email?.address}`}
              unlinkAction={() => {
                unlinkEmail(email?.address as string);
              }}
              linkAction={linkEmail}
            />

            <AuthLinker
              unlinkedText="Link their wallet to get their ENS, NFTs for profile pictures or any other web3 awesomeness!"
              linkedText={`This user has a valid email linked: ${formatWallet(wallet?.address)}!`}
              canRemove={canRemoveAccount}
              isLink={!!wallet}
              linkCta="Link a wallet"
              unlinkCta={`Unlink ${formatWallet(wallet?.address)}`}
              unlinkAction={() => {
                unlinkWallet(wallet?.address as string);
              }}
              linkAction={linkWallet}
            />

            <AuthLinker
              unlinkedText="Link their phone to communicate with them via SMS and be a mobile first!"
              linkedText={`This user has a valid phone linked: ${phone?.number}!`}
              canRemove={canRemoveAccount}
              isLink={!!phone}
              linkCta="Link a phone"
              unlinkCta={`Unlink ${phone?.number}`}
              unlinkAction={() => {
                unlinkPhone(phone?.number as string);
              }}
              linkAction={linkPhone}
            />
            <AuthLinker
              unlinkedText="Wanna link google, guy?"
              linkedText="Wow google is so fucking linked"
              canRemove={canRemoveAccount}
              isLink={!!googleSubject}
              linkCta="Link google"
              unlinkCta="Unlink google"
              unlinkAction={() => {
                unlinkGoogle(googleSubject as string);
              }}
              linkAction={() => {
                linkGoogle();
              }}
            />
            <AuthLinker
              unlinkedText="Link their twitter to engage your community and encourage user follows"
              linkedText="This user has linked their twitter account!"
              canRemove={canRemoveAccount}
              isLink={!!twitterSubject}
              linkCta="Link twitter"
              unlinkCta="Unlink twitter"
              unlinkAction={() => {
                unlinkTwitter(twitterSubject as string);
              }}
              linkAction={() => {
                linkTwitter();
              }}
            />
            <AuthLinker
              unlinkedText="Collect their discord handle for group management"
              linkedText="This user has linked their discord account!"
              canRemove={canRemoveAccount}
              isLink={!!discordSubject}
              linkCta="Link Discord"
              unlinkCta="Unlink Discord"
              unlinkAction={() => {
                unlinkDiscord(discordSubject as string);
              }}
              linkAction={() => {
                linkDiscord();
              }}
            />

            {canRemoveAccount ? null : (
              <p className="text-gray-100 text-sm">
                Note that if the user only has one account, you cannot unlink it.
              </p>
            )}
          </div>

          <div className="bg-black p-6">
            <p className="font-bold uppercase text-sm text-gray-400">User object</p>
            <textarea
              value={JSON.stringify(user, null, 2)}
              className="min-w-full bg-slate-700 text-slate-50 font-mono text-xs sm:text-sm rounded-md mt-2"
              rows={20}
              disabled
            />
          </div>
        </div>
      </main>
    </>
  );
}
