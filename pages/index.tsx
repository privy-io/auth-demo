import {useRouter} from 'next/router';
import Head from 'next/head';
import {usePrivy} from '@privy-io/react-auth';
import Loading from '../components/loading';
import {Header} from '../components/header';
import CanvasSidebarAuthConfig from '../components/canvas-sidebar-auth-config';
import PrivyBlobIcon from '../components/icons/outline/privy-blob';
import {
  ArrowDownOnSquareIcon,
  ArrowRightIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';
import CanvasCardHeader from '../components/canvas-card-header';
import CanvasCard from '../components/canvas-card';
import CanvasContainer from '../components/canvas-container';
import Canvas from '../components/canvas';
import CanvasRow from '../components/canvas-row';
import {useContext, useEffect, useState} from 'react';
import PrivyConfigContext, {
  defaultDashboardConfig,
  defaultIndexConfig,
  PRIVY_STORAGE_KEY,
} from '../lib/hooks/usePrivyConfig';
import useMediaQuery from '../lib/hooks/useMediaQuery';

const mobileQuery = '(max-width: 768px)';

export default function LoginPage() {
  const router = useRouter();
  const {login, ready, authenticated} = usePrivy();
  const {config, setConfig} = useContext(PrivyConfigContext);
  const [copied, setCopied] = useState(false);
  const storedConfigRaw =
    typeof window === 'undefined' ? null : window.localStorage.getItem(PRIVY_STORAGE_KEY);
  const storedConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : null;
  const [readyToSetTheme, setReadyToSetTheme] = useState(false);

  const isMobile = useMediaQuery(mobileQuery);
  useEffect(() => {
    if (!ready || authenticated) {
      return;
    }
    setConfig?.({
      ...config,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,

      // @ts-expect-error internal api
      _render: isMobile ? defaultDashboardConfig._render : defaultIndexConfig._render,
      embeddedWallets: {
        ...defaultIndexConfig.embeddedWallets,
        requireUserPasswordOnCreate:
          storedConfig?.embeddedWallets?.requireUserPasswordOnCreate ??
          defaultIndexConfig.embeddedWallets!.requireUserPasswordOnCreate,
      },
    });
    // ensure that the modal is open on desktop
    if (!isMobile) {
      login();
    }
    setReadyToSetTheme(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, ready, authenticated]);

  useEffect(() => {
    if (!ready || authenticated) {
      return;
    }
    const isMobileOnLoad = window.matchMedia(mobileQuery).matches;

    // there is an issue with applying the dashboard config (render as modal)
    // _after_ loading the dashboard page, where the changing from in-line to modal
    // rendering will re-trigger the oauth process (since that's an effect on the oauth
    // status screen.) This will apply the config change if coming back from an oauth redirect,
    // before that issue arises.
    const currentUrl = new URL(window.location.href);
    const oauthProvider = currentUrl.searchParams.get('privy_oauth_provider');
    setConfig?.({
      ...(oauthProvider ? defaultDashboardConfig : defaultIndexConfig),
      // @ts-expect-error internal api
      _render: isMobileOnLoad ? defaultDashboardConfig._render : defaultIndexConfig._render,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,
      embeddedWallets: {
        ...defaultIndexConfig.embeddedWallets,
        requireUserPasswordOnCreate:
          storedConfig?.embeddedWallets?.requireUserPasswordOnCreate ??
          defaultIndexConfig.embeddedWallets!.requireUserPasswordOnCreate,
      },
    });

    if (!isMobileOnLoad) {
      login();
    }
    setReadyToSetTheme(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated]);

  if (!ready) {
    return <Loading />;
  } else if (ready && authenticated) {
    router.push('/dashboard');
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Privy Demo</title>
      </Head>
      <div className="flex h-full max-w-screen-2xl flex-col bg-privy-color-background px-6 pb-6">
        <Header />
        <button
          onClick={() => {
            login();
          }}
          className="button button-primary fixed bottom-4 right-4 left-4 z-[1] items-center gap-x-2 rounded-[13px] px-3 py-3 text-[14px] text-white md:hidden md:py-0"
        >
          Launch Privy
        </button>
        <CanvasContainer>
          <CanvasSidebarAuthConfig readyToSetTheme={readyToSetTheme} className="flex flex-col" />
          {/* start: canvas-panel */}
          <Canvas className="md:pl-20 md:pr-8">
            {/* start: modal-column */}
            <div id="render-privy" className="z-[2] mx-auto pt-8 md:mx-0 md:pt-0" />
            {/* end: modal-column */}
            <CanvasRow className="hidden md:flex">
              {/* start: cta */}
              <CanvasCard className="!border-none bg-gradient-to-r from-privy-color-accent-light to-red-300 !p-1">
                <div className="rounded-lg bg-privy-color-background p-4">
                  <CanvasCardHeader>
                    <PrivyBlobIcon className="h-5 w-5" strokeWidth={2} />
                    Explore Privy
                  </CanvasCardHeader>
                  <div className="pb-2 text-sm text-privy-color-foreground-3">
                    The easiest way to onboard all of your users to web3
                  </div>
                  <div className="text-sm">Sign in to the demo to access the dev tools.</div>
                  <div className="flex gap-x-2 pt-2">
                    <a
                      href="https://docs.privy.io"
                      className="button h-[1.625rem] gap-x-2 pl-3 pr-2 text-sm"
                    >
                      Explore the Docs <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </CanvasCard>
              {/* end: cta */}
              <CanvasCard>
                <CanvasCardHeader>
                  <ArrowDownOnSquareIcon className="h-5 w-5" strokeWidth={2} />
                  Export this configuration
                </CanvasCardHeader>
                <div className="pb-2 text-sm text-privy-color-foreground-3">
                  Privy&apos;s components can be customized{' '}
                  <a
                    href="https://docs.privy.io/guide/theming"
                    target="_blank"
                    rel="noreferrer nopener"
                  >
                    client-side
                  </a>
                  , so you can easily reuse this theme in your application.
                </div>
                <div className="flex gap-x-2 pt-2">
                  <div
                    className="button h-[1.625rem] cursor-pointer gap-x-2 pl-3 pr-2 text-sm"
                    onClick={() => {
                      const {
                        // @ts-expect-error internal api
                        _render,
                        ...rest
                      } = config;

                      const providerCode = `<PrivyProvider config={${JSON.stringify(
                        rest,
                      )}}>{children}</PrivyProvider>`;
                      navigator.clipboard.writeText(providerCode).catch((error) => {
                        console.error('Failed to copy text to clipboard:', error);
                      });
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" strokeWidth={2} />
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </div>
                </div>
              </CanvasCard>
            </CanvasRow>
          </Canvas>
          {/* end: canvas-panel */}
        </CanvasContainer>
      </div>
    </>
  );
}
