import Image from 'next/image';
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
              <h1 className="text-3xl font-semibold text-gray-800">Privy Auth Demo</h1>
              <p className="mt-6 max-w-2xl">
                You are now authenticated with Privy! You can see the user object, and its linked
                accounts, to the right.
              </p>
              <p className="max-w-2xl">
                Below, you can interact with the library just as you would on any site that
                integrates our SDK. Try linking and unlinking accounts in the left column, and
                you&rsquo;ll see the available JSON user object dynamically change in the right
                column.
              </p>
            </div>
            <UserBox user={user} />
            <p className="underline hover:cursor-pointer" onClick={logout}>
              Logout
            </p>
          </div>
        </div>

        <div id="columns" className="grid grid-cols-2 mt-36 gap-10">
          <div>
            <h2 className="font-bold uppercase text-lg text-gray-600">
              Progressive account linking
            </h2>
            <p className="text-sm text-gray-600">
              We build opinionated tooling so you can build delightful products. You decide when to
              engage users, we take care of the how. Try it out!
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <AuthLinker
                unlinkedText="Collect their email to send them personalized notifications!"
                linkedText={`This user has a valid email linked. You can now communicate with them in a personalized way!`}
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
                linkedText={`This user has linked an ethereum wallet: ${formatWallet(
                  wallet?.address,
                )}!`}
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
                unlinkedText="Link their phone to communicate with them via SMS for a mobile first experience!"
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
                unlinkedText="How about linking google OAuth and getting their name?"
                linkedText={`Google auth is linked, and we now know your name: ${user?.google?.name}`}
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
                unlinkCta={`Unlink ${user?.twitter?.username}'s twitter`}
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
                unlinkCta={`Unlink ${user?.discord?.username}'s discord`}
                unlinkAction={() => {
                  unlinkDiscord(discordSubject as string);
                }}
                linkAction={() => {
                  linkDiscord();
                }}
              />
            </div>

            {canRemoveAccount ? null : (
              <p className="text-gray-100 text-sm">
                Note that if the user only has one account, you cannot unlink it.
              </p>
            )}
          </div>

          <div className="flex flex-col grow">
            <h2 className="font-bold uppercase text-lg text-gray-600">User object</h2>
            <p className="text-sm text-gray-600">
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
                className="min-w-full min-h-full bg-white text-slate-700 font-mono text-xs sm:text-sm rounded-xl border-2 border-gray-800"
                rows={20}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-40">
          <h1 className="text-3xl font-semibold text-gray-800">Gallery</h1>
          <div className="mt-6 flex gap-10">
            <p className="mt-4">
              You can customize the Privy Modal to fit your websites design and logo, making users
              feel right at home.
              <br />
              Check out examples below
            </p>
            <Image
              src="/arrow-down-right.png"
              width="235px"
              height="106px"
              alt="top down arrow, go check out the gallery!"
            />
          </div>
          <div className="flex justify-evenly gap-10 mt-10">
            <Image src="/example1.png" height="630px" width="372px" alt="Decent.xyz example" />
            <Image src="/example2.png" height="633px" width="373px" alt="Lightouse.world example" />
            <Image src="/example3.png" height="647px" width="399px" alt="Privy console example" />
          </div>
        </div>
      </main>
    </>
  );
}
