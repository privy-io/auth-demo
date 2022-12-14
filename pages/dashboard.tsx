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
          <div className="flex flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800">You&rsquo;re logged in!</h1>
              <p className="max-w-4xl mt-2">
                With just a few lines of code, you can easily prompt your users to link different
                accounts, and safely take on credentials. If you want to get into specifics, check
                out our{' '}
                <a
                  className="hover:cursor-pointer underline"
                  href="https://docs.privy.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  our docs
                </a>
                .
                <br />
                The best part? You can customize Privy to match your brand (check out our{' '}
                <Link href="/gallery">
                  <span className="underline hover:cursor-pointer">gallery</span>
                </Link>
                ). Ready to get started?
              </p>
            </div>
            <p className="underline hover:cursor-pointer" onClick={logout}>
              Logout
            </p>
          </div>
        </div>

        <div id="columns" className="grid grid-cols-3 mt-24 gap-10">
          <div>
            <h2 className="font-bold uppercase text-lg text-slate-700">
              Progressive account linking
            </h2>
            <p className="text-sm text-slate-600 min-h-[60px]">
              We build opinionated tooling so you can build delightful products. You decide when to
              engage users, we take care of the how. Try it out!
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <AuthLinker
                unlinkedText="Collect their email to send them personalized notifications, and creating an engaging experience."
                linkedText={`This user has a valid email linked. You can now communicate with them in a personalized way!`}
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
                unlinkedText="Link their wallet to get their ENS, NFTs for profile pictures or any other web3 awesomeness!"
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
                unlinkedText="Link their phone to communicate with them via SMS for a mobile first experience."
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
                unlinkedText="How about linking google OAuth and getting their name?"
                linkedText={`Google auth is linked, and we can now personalize communications with you, ${user?.google?.name}.`}
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
                unlinkedText="Link their twitter to engage your community and encourage user follows."
                linkedText="This user has linked their twitter account!"
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
                unlinkedText="Collect their discord handle for group management"
                linkedText={`Thanks for connecting discord, ${user?.discord?.username}`}
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

          <div className="flex flex-col items-center justify-start grow">
            <h2 className="font-bold uppercase text-lg text-slate-700">
              Current authenticated user
            </h2>
            <div className="min-h-[60px] mb-4"></div>
            <UserBox user={user} />
            <Image src="/arrow_up.png" height="201px" width="193px" alt="arrow up" />
          </div>

          <div className="flex flex-col grow">
            <h2 className="font-bold uppercase text-lg text-slate-700">User object</h2>
            <p className="text-sm text-slate-600 min-h-[60px]">
              This is the JSON object you receive when using the Privy Auth library. Watch as it
              dynamically populates as you link accounts on the left. Learn more in{' '}
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
                className="min-w-full min-h-full bg-white text-slate-700 font-mono text-xs sm:text-sm rounded-xl border-2 border-slate-800"
                rows={20}
                disabled
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
