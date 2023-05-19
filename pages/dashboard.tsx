// We trust all links we're sending to, so keep referrers for tracking
/* eslint-disable react/jsx-no-target-blank */

import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useState, useEffect, useContext} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import type {WalletWithMetadata} from '@privy-io/react-auth';
import Head from 'next/head';
import Loading from '../components/loading';
import AuthLinker, {LinkButton, AuthSection} from '../components/auth-linker';
import {clearDatadogUser} from '../lib/datadog';
import {DismissableInfo, DismissableError, DismissableSuccess} from '../components/toast';
import ActiveWalletDropdown from '../components/wallet-dropdown';
import {getHumanReadableWalletType} from '../lib/utils';
import {Header} from '../components/header';
import CanvasContainer from '../components/canvas-container';
import CanvasSidebarConsole from '../components/canvas-sidebar-console';
import CanvasCard from '../components/canvas-card';
import CanvasSidebarHeader from '../components/canvas-sidebar-header';
import {
  ArrowLeftOnRectangleIcon,
  ArrowsUpDownIcon,
  CommandLineIcon,
  PencilIcon,
  PlusIcon,
  UserCircleIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import Canvas from '../components/canvas';
import CanvasRow from '../components/canvas-row';
import CanvasCardHeader from '../components/canvas-card-header';
import PrivyConfigContext from '../lib/hooks/usePrivyConfig';

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

  const {setConfig} = useContext(PrivyConfigContext);

  useEffect(() => {
    setConfig?.({
      _render: {
        inDialog: true,
        inParentNodeId: null,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                className="no-scrollbar h-full w-full resize-none rounded-lg border-0 bg-gray-100 p-4 font-mono text-xs text-gray-700"
                disabled
              />
            </div>
            <div className="shrink-0 grow-0 pb-4 text-sm text-gray-400">
              Privy gives you modular components so you can customize your product for your users.
              Learn more in{' '}
              <a href="https://docs.privy.io/guide/frontend/users/object" target="_blank">
                our docs
              </a>
              .
            </div>
            <CanvasCard className="shrink-0 grow-0 !shadow-none">
              <div className="pb-4 text-sm text-gray-400">
                Sign out or delete your data to restart the demo and customize your theme.
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="button-secondary h-8 gap-x-1 px-3 text-sm"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" strokeWidth={2} />
                  Sign out
                </button>
                <button
                  onClick={deleteUser}
                  className="button-secondary h-8 gap-x-2 px-3 text-sm !text-red-400"
                >
                  Delete Account
                </button>
              </div>
            </CanvasCard>
          </CanvasSidebarConsole>
          <Canvas>
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
                      key={wallet.address}
                      isLink
                      linkedText={formatWallet(wallet.address)}
                      canUnlink={canRemoveAccount}
                      unlinkAction={() => {
                        unlinkWallet(wallet.address);
                      }}
                      linkAction={linkWallet}
                      additionalInfo={
                        wallet.address === walletConnectors?.activeWalletConnector?.address ? (
                          <span className="flex items-center gap-1 rounded-md bg-slate-100 py-1 px-2 text-xs">
                            active
                          </span>
                        ) : null
                      }
                      isEmbeddedWallet={wallet.walletClient === 'privy'}
                    />
                  ))}
                  <ActiveWalletDropdown
                    disabled={!wallets.length}
                    options={wallets.map((wallet) => {
                      if (wallet.walletClient === 'privy') {
                        return {
                          title: formatWallet(wallet.address),
                          description: 'Embedded · ready',
                          onClick: () => {
                            // This isn't a problem right now because people shouldn't haven
                            // an embedded wallet yet in the demo. Needs to be fixed in PRI-743
                            console.log('TODO: need to set active!');
                          },
                          selected: wallet.address === user?.wallet?.address,
                        };
                      }
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
                        selected: wallet.address == activeWalletAddress,
                      };
                    })}
                  />
                  <button
                    className="button-secondary h-10 gap-x-1 px-4 text-sm"
                    onClick={linkWallet}
                  >
                    <PlusIcon className="h-4 w-4" strokeWidth={2} />
                    Link a Wallet
                  </button>
                  {/* <AuthSection text="Link a wallet" action={<LinkButton onClick={linkWallet} />} /> */}
                </div>
              </CanvasCard>
              <CanvasCard>
                <CanvasCardHeader>
                  <ArrowsUpDownIcon className="h-5 w-5" strokeWidth={2} />
                  Wallet Actions
                </CanvasCardHeader>
                <div className="text-sm text-gray-400">
                  Temporibus et sed eligendi. Excepturi aspernatur...
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    className="button-secondary h-10 gap-x-1 px-4 text-sm"
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

                  <AuthLinker
                    unlinkedText="Link an Apple account"
                    linkedText={`Apple email ${appleEmail}`}
                    canUnlink={canRemoveAccount}
                    isLink={!!appleSubject}
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
