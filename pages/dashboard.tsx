// We trust all links we're sending to, so keep referrers for tracking
/* eslint-disable react/jsx-no-target-blank */

import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useState, useEffect, useContext} from 'react';
import {ConnectedWallet, usePrivy, useWallets} from '@privy-io/react-auth';
import Head from 'next/head';
import Loading from '../components/loading';
import AuthLinker from '../components/auth-linker';
import {clearDatadogUser} from '../lib/datadog';
import {DismissableInfo, DismissableError, DismissableSuccess} from '../components/toast';
import {formatWallet} from '../lib/utils';
import {Header} from '../components/header';
import CanvasContainer from '../components/canvas-container';
import CanvasSidebar from '../components/canvas-sidebar';
import CanvasCard from '../components/canvas-card';
import CanvasSidebarHeader from '../components/canvas-sidebar-header';
import {
  ArrowLeftOnRectangleIcon,
  ArrowUpOnSquareIcon,
  ArrowsUpDownIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PencilIcon,
  PlusIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import Canvas from '../components/canvas';
import CanvasRow from '../components/canvas-row';
import CanvasCardHeader from '../components/canvas-card-header';
import PrivyConfigContext, {
  defaultDashboardConfig,
  defaultIndexConfig,
  PRIVY_APPEARANCE_STORAGE_KEY,
} from '../lib/hooks/usePrivyConfig';
import Image from 'next/image';
import PrivyBlobIcon from '../components/icons/outline/privy-blob';
import GitHubIcon from '../components/icons/social/github';
import AppleIcon from '../components/icons/social/apple';

export default function LoginPage() {
  const router = useRouter();
  const [signLoading, setSignLoading] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [signError, setSignError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeWallet, setActiveWallet] = useState<ConnectedWallet | null>(null);

  const {setConfig} = useContext(PrivyConfigContext);

  useEffect(() => {
    setConfig?.({
      ...defaultDashboardConfig,
      appearance: window.localStorage.getItem(PRIVY_APPEARANCE_STORAGE_KEY)
        ? JSON.parse(window.localStorage.getItem(PRIVY_APPEARANCE_STORAGE_KEY)!)
        : defaultIndexConfig.appearance,
    });
  }, [setConfig]);

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
    linkGoogle,
    unlinkGoogle,
    linkTwitter,
    unlinkTwitter,
    linkDiscord,
    unlinkDiscord,
    linkGithub,
    unlinkGithub,
    linkApple,
    unlinkApple,
    getAccessToken,
    createWallet,
    exportWallet,
  } = usePrivy();

  const {wallets: allWallets} = useWallets();

  useEffect(() => {
    if (ready && !authenticated) {
      clearDatadogUser();
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const linkedAccounts = user?.linkedAccounts || [];

  const wallets = allWallets.sort((a, b) => a.address.localeCompare(b.address));
  console.log(activeWallet?.connectedAt);

  useEffect(() => {
    // if no active wallet is set, set it to the first one if available
    if (!activeWallet && wallets && wallets.length > 0) {
      setActiveWallet(wallets[0]!);
    }
    // if an active wallet was removed from wallets, clear it out
    if (!wallets.some((w) => w.address === activeWallet?.address)) {
      setActiveWallet(wallets && wallets.length > 0 ? wallets[0]! : null);
    }
  }, [activeWallet, wallets]);

  const embeddedWallet = wallets.filter((wallet) => wallet.walletClientType === 'privy')?.[0];

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

  // Remove unknown walletClients.
  // `user` has to be `any` type because by default walletClient is required.
  const removeUnknownWalletClients = (user: any) => {
    user.linkedAccounts.forEach(function (linkedAccount: any, index: number) {
      if (linkedAccount.type === 'wallet' && linkedAccount.walletClient === 'unknown') {
        delete user.linkedAccounts[index].walletClient;
      }
    });
    if (user.wallet?.walletClient === 'unknown') {
      delete user.wallet.walletClient;
    }
    return user;
  };

  return (
    <>
      <Head>
        <title>Privy Demo</title>
      </Head>

      <div className="flex h-full flex-col px-6 pb-6">
        <Header />
        <CanvasContainer>
          <CanvasSidebar className="px-6 pb-6">
            <CanvasSidebarHeader>
              <CommandLineIcon className="h-5 w-5" strokeWidth={2} />
              <div className="w-full">Console</div>
            </CanvasSidebarHeader>
            <div className="h-full py-4">
              <textarea
                value={JSON.stringify(removeUnknownWalletClients(user), null, 2)}
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
                  onClick={async () => {
                    setIsDeleting(true);
                    await deleteUser();
                    setIsDeleting(true);
                  }}
                  className="button h-8 gap-x-2 px-3 text-sm !text-red-400"
                >
                  {!isDeleting ? 'Delete Account' : 'Deleting account...'}
                </button>
              </div>
            </CanvasCard>
          </CanvasSidebar>
          <Canvas className="gap-x-8">
            <CanvasRow>
              <CanvasCard>
                <CanvasCardHeader>
                  <WalletIcon className="h-5 w-5" strokeWidth={2} />
                  Wallets
                </CanvasCardHeader>
                <div className="pb-1 text-sm text-privy-color-foreground-3">
                  Connect and link wallets to your account.
                </div>
                <div className="flex flex-col gap-2">
                  {wallets.map((wallet) => (
                    <AuthLinker
                      isLinked
                      wallet={wallet}
                      isActive={
                        wallet.address === activeWallet?.address &&
                        wallet.connectedAt === activeWallet?.connectedAt
                      }
                      setActiveWallet={setActiveWallet}
                      key={wallet.address}
                      label={formatWallet(wallet.address)}
                      canUnlink={canRemoveAccount && wallet.linked}
                      unlinkAction={() => {
                        wallet.unlink();
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
                  Whether they came in with Metamask or an embedded wallet, a user is a user.
                  Trigger wallet actions below.
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    className="button h-10 gap-x-1 px-4 text-sm"
                    disabled={signLoading || !wallets.length || !activeWallet}
                    onClick={() => {
                      setSignError(false);
                      setSignSuccess(false);
                      setSignLoading(true);
                      activeWallet
                        ?.sign('Signing with the active wallet in Privy: ' + activeWallet?.address)
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
              {/* If they don't have an Embedded Wallet */}
              {embeddedWallet ? (
                <CanvasCard>
                  <CanvasCardHeader>
                    <PrivyBlobIcon className="h-5 w-5 shrink-0 grow-0" strokeWidth={2} />
                    <div className="w-full">Embedded Wallet</div>
                    <div className="flex shrink-0 grow-0 flex-row items-center justify-end gap-x-1 text-privy-color-foreground-3">
                      {formatWallet(embeddedWallet.address)}
                    </div>
                  </CanvasCardHeader>
                  <div className="text-sm text-privy-color-foreground-3">
                    A user&apos;s embedded wallet is theirs to keep, and even take with them.
                  </div>
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      className="button h-10 gap-x-1 px-4 text-sm"
                      disabled={!(ready && authenticated)}
                      onClick={() => {
                        exportWallet();
                      }}
                    >
                      <ArrowUpOnSquareIcon className="h-4 w-4" strokeWidth={2} />
                      Export your Embedded wallet
                    </button>
                  </div>
                </CanvasCard>
              ) : (
                <CanvasCard>
                  <CanvasCardHeader>
                    <PrivyBlobIcon className="h-5 w-5 shrink-0 grow-0" strokeWidth={2} />
                    Embedded Wallet
                  </CanvasCardHeader>
                  <div className="text-sm text-privy-color-foreground-3">
                    With Privy, even non web3 natives can enjoy the benefits of life on chain.
                  </div>
                  <div className="flex flex-col gap-2 pt-4">
                    <button
                      className="button h-10 gap-x-1 px-4 text-sm"
                      disabled={!(ready && authenticated)}
                      onClick={() => {
                        createWallet();
                      }}
                    >
                      <PlusIcon className="h-4 w-4" strokeWidth={2} />
                      Create an Embedded Wallet
                    </button>
                  </div>
                </CanvasCard>
              )}
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
                      <DevicePhoneMobileIcon
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
                    linkedLabel={`${twitterUsername}`}
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
                    linkedLabel={`${discordUsername}`}
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
                        <GitHubIcon height={20} width={20} />
                      </div>
                    }
                    label="Github"
                    linkedLabel={`${githubUsername}`}
                    canUnlink={canRemoveAccount}
                    isLinked={!!githubSubject}
                    unlinkAction={() => {
                      unlinkGithub(githubSubject as string);
                    }}
                    linkAction={linkGithub}
                  />

                  <AuthLinker
                    socialIcon={
                      <div className="h-[1.125rem] w-[1.125rem] shrink-0 grow-0 text-privy-color-foreground">
                        <AppleIcon height={20} width={20} />
                      </div>
                    }
                    label="Apple"
                    linkedLabel={`${appleEmail}`}
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
