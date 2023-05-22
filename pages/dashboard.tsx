// We trust all links we're sending to, so keep referrers for tracking
/* eslint-disable react/jsx-no-target-blank */

import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useState, useEffect, useContext} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import type {WalletWithMetadata} from '@privy-io/react-auth';
import Head from 'next/head';
import Loading from '../components/loading';
import AuthLinker from '../components/auth-linker';
import {clearDatadogUser} from '../lib/datadog';
import {DismissableInfo, DismissableError, DismissableSuccess} from '../components/toast';
import ActiveWalletDropdown from '../components/wallet-dropdown';
import {getHumanReadableWalletType, formatWallet} from '../lib/utils';
import {Header} from '../components/header';
import CanvasContainer from '../components/canvas-container';
import CanvasSidebarConsole from '../components/canvas-sidebar-console';
import CanvasCard from '../components/canvas-card';
import CanvasSidebarHeader from '../components/canvas-sidebar-header';
import {
  ArrowLeftOnRectangleIcon,
  ArrowsUpDownIcon,
  CommandLineIcon,
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import Canvas from '../components/canvas';
import CanvasRow from '../components/canvas-row';
import CanvasCardHeader from '../components/canvas-card-header';
import PrivyConfigContext, {defaultDashboardConfig} from '../lib/hooks/usePrivyConfig';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [signLoading, setSignLoading] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [signError, setSignError] = useState(false);

  const {setConfig} = useContext(PrivyConfigContext);

  useEffect(() => setConfig?.(defaultDashboardConfig), [setConfig]);

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
    walletConnectors,
    linkGithub,
    unlinkGithub,
    linkApple,
    unlinkApple,
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

  const appleSubject = user?.apple?.subject;
  const appleEmail = user?.apple?.email;

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

      <div className="flex h-full max-w-screen-2xl flex-col px-6 pb-6">
        <Header />
        <CanvasContainer>
          <CanvasSidebarConsole className="px-6 pb-6">
            <CanvasSidebarHeader>
              <CommandLineIcon className="h-5 w-5" strokeWidth={2} />
              <div className="w-full">Console</div>
            </CanvasSidebarHeader>
            <div className="h-full py-4">
              <textarea
                value={JSON.stringify(user, null, 2)}
                className="no-scrollbar h-full w-full resize-none rounded-lg border-0 bg-privy-color-background-2 p-4 font-mono text-xs text-privy-color-foreground-2"
                disabled
              />
            </div>
            <div className="shrink-0 grow-0 pb-4 text-sm text-privy-color-foreground-3">
              Privy gives you modular components so you can customize your product for your users.
              Learn more in{' '}
              <a href="https://docs.privy.io/guide/frontend/users/object" target="_blank">
                our docs
              </a>
              .
            </div>
            <CanvasCard className="shrink-0 grow-0 !shadow-none">
              <div className="pb-4 text-sm text-privy-color-foreground-3">
                Sign out or delete your data to restart the demo and customize your theme.
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="button h-8 gap-x-1 px-3 text-sm"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" strokeWidth={2} />
                  Sign out
                </button>
                <button
                  onClick={deleteUser}
                  className="button h-8 gap-x-2 px-3 text-sm !text-red-400"
                >
                  Delete Account
                </button>
              </div>
            </CanvasCard>
          </CanvasSidebarConsole>
          <Canvas className="gap-x-10">
            <CanvasRow>
              <CanvasCard>
                <CanvasCardHeader>
                  <WalletIcon className="h-5 w-5" strokeWidth={2} />
                  Wallets
                </CanvasCardHeader>
                {canRemoveAccount ? null : (
                  <p className="mt-4 px-1 text-sm text-slate-400">
                    Note that if the user only has one account, you cannot unlink it.
                  </p>
                )}
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
                <div className="flex flex-col gap-2">
                  {wallets.map((wallet) => (
                    <AuthLinker
                      isLinked
                      wallet={wallet}
                      isActive={wallet.address === walletConnectors?.activeWalletConnector?.address}
                      key={wallet.address}
                      label={formatWallet(wallet.address)}
                      canUnlink={canRemoveAccount}
                      unlinkAction={() => {
                        unlinkWallet(wallet.address);
                      }}
                      linkAction={linkWallet}
                    />
                  ))}
                  <button className="button h-10 gap-x-1 px-4 text-sm" onClick={linkWallet}>
                    <PlusIcon className="h-4 w-4" strokeWidth={2} />
                    Link a Wallet
                  </button>
                </div>
              </CanvasCard>
              <CanvasCard>
                <CanvasCardHeader>
                  <ArrowsUpDownIcon className="h-5 w-5" strokeWidth={2} />
                  Wallet Actions
                </CanvasCardHeader>
                <div className="text-sm text-privy-color-foreground-3">
                  Temporibus et sed eligendi. Excepturi aspernatur...
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    className="button h-10 gap-x-1 px-4 text-sm"
                    disabled={
                      signLoading ||
                      !walletConnectors?.walletConnectors?.length ||
                      !walletConnectors?.activeWalletConnector
                    }
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
                    <PencilIcon className="h-4 w-4" strokeWidth={2} />
                    Sign a Message
                  </button>
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
                </div>
              </CanvasCard>
            </CanvasRow>

            <CanvasRow>
              <CanvasCard>
                <CanvasCardHeader>
                  <UserCircleIcon className="h-5 w-5" strokeWidth={2} />
                  Linked Socials
                </CanvasCardHeader>
                <div className="flex flex-col gap-2">
                  <AuthLinker
                    socialIcon={
                      <EnvelopeIcon
                        className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0"
                        strokeWidth={2}
                      />
                    }
                    label="Email"
                    linkedLabel={`${emailAddress}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!emailAddress}
                    unlinkAction={() => {
                      unlinkEmail(emailAddress as string);
                    }}
                    linkAction={linkEmail}
                  />

                  <AuthLinker
                    socialIcon={
                      <PhoneIcon
                        className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0"
                        strokeWidth={2}
                      />
                    }
                    label="Phone"
                    linkedLabel={`${phoneNumber}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!phoneNumber}
                    unlinkAction={() => {
                      unlinkPhone(phoneNumber as string);
                    }}
                    linkAction={linkPhone}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                        <Image
                          src="/social-icons/color/google.svg"
                          height={20}
                          width={20}
                          alt="Google"
                        />
                      </div>
                    }
                    label="Google"
                    linkedLabel={`${googleName}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!googleSubject}
                    unlinkAction={() => {
                      unlinkGoogle(googleSubject as string);
                    }}
                    linkAction={linkGoogle}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                        <Image
                          src="/social-icons/color/twitter.svg"
                          height={20}
                          width={20}
                          alt="Google"
                        />
                      </div>
                    }
                    label="Twitter"
                    linkedLabel={`Twitter user ${twitterUsername}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!twitterSubject}
                    unlinkAction={() => {
                      unlinkTwitter(twitterSubject as string);
                    }}
                    linkAction={linkTwitter}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                        <Image
                          src="/social-icons/color/discord.svg"
                          height={20}
                          width={20}
                          alt="Google"
                        />
                      </div>
                    }
                    label="Discord"
                    linkedLabel={`Discord user ${discordUsername}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!discordSubject}
                    unlinkAction={() => {
                      unlinkDiscord(discordSubject as string);
                    }}
                    linkAction={linkDiscord}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                        <Image
                          src="/social-icons/color/github.svg"
                          height={20}
                          width={20}
                          alt="Google"
                        />
                      </div>
                    }
                    label="Github"
                    linkedLabel={`Github user ${githubUsername}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!githubSubject}
                    unlinkAction={() => {
                      unlinkGithub(githubSubject as string);
                    }}
                    linkAction={linkGithub}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0">
                        <Image
                          src="/social-icons/color/apple.svg"
                          height={20}
                          width={20}
                          alt="Google"
                        />
                      </div>
                    }
                    label="Apple"
                    linkedLabel={`Apple email ${appleEmail}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!appleSubject}
                    unlinkAction={() => {
                      unlinkApple(appleSubject as string);
                    }}
                    linkAction={linkApple}
                  />
                </div>
              </CanvasCard>
            </CanvasRow>
          </Canvas>
        </CanvasContainer>
      </div>
    </>
  );
}
