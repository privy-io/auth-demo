// We trust all links we're sending to, so keep referrers for tracking
/* eslint-disable react/jsx-no-target-blank */

import axios from 'axios';
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
import {DismissableInfo, DismissableError, DismissableSuccess} from '../components/toast';
import ActiveWalletDropdown from '../components/wallet-dropdown';
import {getHumanReadableWalletType} from '../lib/utils';
import Image from 'next/image';

const formatWallet = (address: string | undefined): string => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, 8);
  const last = address.slice(address.length - 4, address.length);
  return `${first}...${last}`;
};

export default function LoginPage() {
  const router = useRouter();
  const [signLoading, setSignLoading] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [signError, setSignError] = useState(false);

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
    getAccessToken,
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

  async function deleteUser() {
    const authToken = await getAccessToken();
    try {
      await axios.delete('/api/users/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
    logout();
  }

  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <div className="relative flex flex-col min-h-screen min-w-screen bg-privy-light-blue">
        <main className="flex flex-col flex-grow p-8 sm:p-10">
          <div className="sm:hidden">
            <div className="flex flex-row items-center justify-between">
              <div>
                <Image
                  src="/logos/privy-demo.png"
                  height="50px"
                  width="206px"
                  alt="Privy Auth Demo"
                />
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="underline text-privurple hover:cursor-pointer hover:text-privurpleaccent"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:block">
            <div className="flex flex-row items-center justify-between">
              <div>
                <Image
                  src="/logos/privy-demo.png"
                  height="50px"
                  width="206px"
                  alt="Privy Auth Demo"
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <p className="underline text-privurple hover:cursor-pointer hover:text-privurpleaccent">
                  <Link href="/gallery">Gallery</Link>
                </p>
                <p className="underline text-privurple hover:cursor-pointer hover:text-privurpleaccent">
                  <a href="https://docs.privy.io" target="_blank">
                    Docs
                  </a>
                </p>
                <p className="underline text-privurple hover:cursor-pointer hover:text-privurpleaccent">
                  <a href="https://docs.privy.io/guide/quickstart" target="_blank">
                    Get started now
                  </a>
                </p>
                <button
                  onClick={logout}
                  className="px-4 py-2 border rounded-md border-privurple border-opacity-90 text-privurple transition-all hover:border-opacity-100 "
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-3">
            <div>
              <h2 className="text-xl font-bold text-privy-navy md:text-2xl">Engage your users</h2>
              <p className="mt-4 text-sm lg:min-h-[60px]">
                With just a few lines of code, you can easily prompt your users to link different
                accounts and safely take on credentials.
              </p>
              <h3 className="mt-5 text-lg font-bold text-privy-navy lg:mt-1">Wallets</h3>
              <div className="flex flex-col mt-5 gap-2">
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
                    additionalInfo={
                      wallet.address === user?.wallet?.address &&
                      walletConnectors?.walletConnectors.find(
                        (wc) => wc.address === wallet.address,
                      ) ? (
                        <span className="flex items-center px-2 py-1 text-xs gap-1 rounded-md bg-slate-100">
                          active
                        </span>
                      ) : null
                    }
                  />
                ))}
                <AuthSection text="Link a wallet" action={<LinkButton onClick={linkWallet} />} />
              </div>

              <h3 className="mt-8 text-lg font-bold text-privy-navy">Email / SMS / Social</h3>

              <div className="flex flex-col mt-5 gap-2">
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
                <p className="px-1 mt-4 text-sm text-slate-400">
                  Note that if the user only has one account, you cannot unlink it.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-privy-navy md:text-2xl">
                Build a rich user object
              </h2>
              <p className="mt-4 text-sm lg:min-h-[60px]">
                Privy gives you modular components so you can customize your product for your users.
                Learn more in{' '}
                <a
                  href="https://docs.privy.io/guide/frontend/users/object"
                  target="_blank"
                  className="underline text-privurple hover:text-privurpleaccent"
                >
                  our docs
                </a>
                .
              </p>
              <h3 className="mt-5 text-lg font-bold text-privy-navy lg:mt-1">JSON</h3>
              <div className="mt-5">
                <textarea
                  value={JSON.stringify(user, null, 2)}
                  className="min-w-full p-5 font-mono text-xs bg-white border-0 rounded-xl text-privy-navy"
                  rows={JSON.stringify(user, null, 2).split('\n').length + 3}
                  disabled
                />
              </div>
              <div className="mt-5">
                <button
                  onClick={deleteUser}
                  className="px-4 py-2 mx-auto text-white rounded-md bg-privurple shadow-sm hover:bg-privurpleaccent disabled:cursor-not-allowed disabled:border-slate-400 disabled:bg-slate-400 hover:disabled:bg-slate-400"
                >
                  Delete my data
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-privy-navy md:text-2xl">
                Work with responsive UI
              </h2>
              <p className="mt-4 text-sm lg:min-h-[60px]">
                You decide when to engage users, we take care of the how. Connect within seconds,
                seriously.
              </p>
              <section className="hidden lg:block">
                <h3 className="mt-5 text-lg font-bold text-privy-navy lg:mt-1">
                  Authenticated accounts
                </h3>
                <div className="mt-5">
                  <UserBox user={user} />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h3 className="mt-10 text-lg font-bold text-privy-navy">Wallet actions</h3>
                <div className="flex flex-col text-sm gap-1">
                  <p>
                    With at least one linked wallet, you can use the active wallet to perform
                    on-chain actions like signing or transactions.
                  </p>
                </div>

                {signSuccess && (
                  <DismissableSuccess
                    message="Success!"
                    clickHandler={() => setSignSuccess(false)}
                  />
                )}
                {signError && (
                  <DismissableError
                    message="Signature failed"
                    clickHandler={() => setSignError(false)}
                  />
                )}
                {signLoading && <DismissableInfo message="Waiting for signature" />}

                <div className="flex">
                  <button
                    disabled={
                      signLoading ||
                      !walletConnectors?.walletConnectors?.length ||
                      !walletConnectors?.activeWalletConnector
                    }
                    className="px-4 py-2 mx-auto text-white rounded-md bg-privurple shadow-sm hover:bg-privurpleaccent disabled:cursor-not-allowed disabled:border-slate-400 disabled:bg-slate-400 hover:disabled:bg-slate-400"
                    onClick={() => {
                      setSignError(false);
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
                        })
                        .catch(() => {
                          setSignError(true);
                          setSignLoading(false);
                        });
                    }}
                  >
                    Sign a message
                  </button>
                </div>

                <div className="flex flex-col text-sm gap-1">
                  <p>
                    As a developer, you can programmatically update the user&rsquo;s active wallet
                    based on the available options in the browser session. Learn more in{' '}
                    <a
                      href="https://docs.privy.io/guide/frontend/wallets/multiwallet"
                      target="_blank"
                      className="underline text-privurple hover:text-privurpleaccent"
                    >
                      our docs
                    </a>
                    .
                  </p>
                </div>

                <div className="flex">
                  <ActiveWalletDropdown
                    disabled={!wallets.length}
                    options={wallets.map((wallet) => {
                      const activeWalletAddress = walletConnectors?.activeWalletConnector?.address;
                      const connector = walletConnectors?.walletConnectors.find(
                        (wc) => wc.address === activeWalletAddress,
                      );
                      return {
                        title: formatWallet(wallet.address),
                        description: `${getHumanReadableWalletType(connector?.walletType)} · ${
                          connector ? 'ready' : 'disconnected'
                        }`,
                        onClick: () => setActiveWallet(wallet.address),
                        selected: wallet.address == user?.wallet?.address && !!connector,
                      };
                    })}
                  />
                </div>
                {!walletConnectors?.walletConnectors?.length && user.wallet && (
                  <p className="text-sm italic">
                    Previously linked wallets cannot be restored at this time. We&rsquo;re working
                    hard to fix this!
                  </p>
                )}
                {!walletConnectors?.walletConnectors?.length && !user.wallet && (
                  <p className="text-sm italic">
                    You haven&rsquo;t linked any wallets yet. Try linking and then come back!
                  </p>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
