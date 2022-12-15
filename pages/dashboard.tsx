import Image from 'next/image';
import Link from 'next/link';
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

      <main className="flex flex-col min-h-screen relative min-w-screen bg-privy-light-blue p-10">
        <div id="header" className="min-w-full">
          <div className="flex flex-row justify-between gap-4 -sm:flex-col-reverse -sm:justify-start -sm:items-center">
            <div className="-sm:flex -sm:flex-col -sm:justify-center -sm:items-center">
              <h1 className="text-3xl font-semibold text-privurple">You&rsquo;re logged in!</h1>
              <p className="max-w-4xl mt-2">
                You're logged in. With just a few lines of code, you can easily prompt your users to
                link different accounts, and safely take on credentials.
                <br />
                <br></br>
                The best part? You can customize Privy to match your brand (check out our{' '}
                <Link href="/gallery">
                  <span className="text-privurple hover:text-privurpleaccent underline hover:cursor-pointer">
                    gallery
                  </span>
                </Link>
                ). Ready to get started?
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                  Docs
                </a>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p>
              <p
                className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center hidden -sm:flex mt-10">
          <UserBox user={user} />
        </div>

        <div id="columns" className="grid grid-cols-3 mt-24 gap-10 -sm:grid-cols-1 -sm:mt-10">
          <div>
            <h2 className="font-bold uppercase text-lg text-slate-700">Engage your users</h2>
            <p className="text-sm text-slate-600 min-h-[60px]">
              We build opinionated tooling so you can build delightful products. You decide when to
              engage users, we take care of the how and keep your users in control of their data.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <AuthLinker
                unlinkedText="Associate an email to a user account to reengage your users."
                linkedText={`This user has linked an email.`}
                canRemove={canRemoveAccount}
                isLink={!!email}
                linkCta="Link an email"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkEmail(email?.address as string);
                }}
                linkAction={linkEmail}
              />

              <AuthLinker
                unlinkedText="Connect one or more wallets to user ENS's, NFTs or take on-chain actions."
                linkedText={`This user has linked an ethereum wallet: ${formatWallet(
                  wallet?.address,
                )}!`}
                canRemove={canRemoveAccount}
                isLink={!!wallet}
                linkCta="Link a wallet"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkWallet(wallet?.address as string);
                }}
                linkAction={linkWallet}
              />

              <AuthLinker
                unlinkedText="Take on a user's phone number to engage them on mobile."
                linkedText={`This user has a valid phone linked: ${phone?.number}!`}
                canRemove={canRemoveAccount}
                isLink={!!phone}
                linkCta="Link a phone"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkPhone(phone?.number as string);
                }}
                linkAction={linkPhone}
              />
              <AuthLinker
                unlinkedText="Use Google for one-click login."
                linkedText={`Google auth is linked, ${user?.google?.name}.`}
                canRemove={canRemoveAccount}
                isLink={!!googleSubject}
                linkCta="Link google"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkGoogle(googleSubject as string);
                }}
                linkAction={() => {
                  linkGoogle();
                }}
              />
              <AuthLinker
                unlinkedText="Integrate with existing social accounts like Twitter."
                linkedText={`This user has linked their twitter: @${user?.twitter?.username}.`}
                canRemove={canRemoveAccount}
                isLink={!!twitterSubject}
                linkCta="Link twitter"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkTwitter(twitterSubject as string);
                }}
                linkAction={() => {
                  linkTwitter();
                }}
              />
              <AuthLinker
                unlinkedText="Engage your Discord community."
                linkedText={`Thanks for connecting discord: ${user?.discord?.username}`}
                canRemove={canRemoveAccount}
                isLink={!!discordSubject}
                linkCta="Link Discord"
                unlinkCta="Unlink"
                unlinkAction={() => {
                  unlinkDiscord(discordSubject as string);
                }}
                linkAction={() => {
                  linkDiscord();
                }}
              />
            </div>

            {canRemoveAccount ? null : (
              <p className="text-slate-400 text-sm mt-4 px-1">
                Note that if the user only has one account, you cannot unlink it.
              </p>
            )}
          </div>

          <div className="flex flex-col grow">
            <h2 className="font-bold uppercase text-lg text-slate-700">User object</h2>
            <p className="text-sm text-slate-600 min-h-[60px]">
              Privy gives you modular components so you can customize your app as you engage your
              users. Below, the user object you receive in your front-end. Learn more in{' '}
              <a
                href="https://docs.privy.io"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                our docs
              </a>
              .
            </p>
            <div className="grow mt-4">
              <textarea
                value={JSON.stringify(user, null, 2)}
                className="min-w-full min-h-full bg-white text-slate-700 font-mono text-xs sm:text-sm rounded-xl border-2 border-lightgray"
                rows={20}
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-start grow -sm:hidden">
            <h2 className="font-bold uppercase text-lg text-slate-700">
              Current authenticated user
            </h2>
            <div className="min-h-[60px] mb-4"></div>
            <div className="animate-bounce-short">
              <UserBox user={user} />
            </div>
            <Image src="/arrow_up.png" height="201px" width="193px" alt="arrow up" />
          </div>
        </div>
      </main>
    </>
  );
}
