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
import {useContext, useEffect} from 'react';
import PrivyConfigContext, {
  defaultDashboardConfig,
  defaultIndexConfig,
  PRIVY_APPEARANCE_STORAGE_KEY,
} from '../lib/hooks/usePrivyConfig';

export default function LoginPage() {
  const router = useRouter();
  const {ready, authenticated} = usePrivy();
  const {config, setConfig} = useContext(PrivyConfigContext);

  useEffect(() => {
    // there is an issue with applying the dashboard config (render as modal)
    // _after_ loading the dashboard page, where the changing from in-line to modal
    // rendering will re-trigger the oauth process (since that's an effect on the oauth
    // status screen.) This will apply the config change if coming back from an oauth redirect,
    // before that issue arises.
    const currentUrl = new URL(window.location.href);
    const oauthProvider = currentUrl.searchParams.get('privy_oauth_provider');
    setConfig?.({
      ...(oauthProvider ? defaultDashboardConfig : defaultIndexConfig),
      appearance: window.localStorage.getItem(PRIVY_APPEARANCE_STORAGE_KEY)
        ? JSON.parse(window.localStorage.getItem(PRIVY_APPEARANCE_STORAGE_KEY)!)
        : defaultIndexConfig.appearance,
    });
  }, [setConfig]);

  if (!ready) {
    return <Loading />;
  } else if (ready && authenticated) {
    router.push('/dashboard');
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>
      <div className="flex h-full max-w-screen-2xl flex-col bg-privy-color-background px-6 pb-6">
        <Header />
        <CanvasContainer>
          <CanvasSidebarAuthConfig />
          {/* start: canvas-panel */}
          <Canvas className="pl-20 pr-8">
            {/* start: modal-column */}
            <div id="render-privy" />
            {/* end: modal-column */}
            <CanvasRow>
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
                  Privy&apos;s components can be customized <a href="#">client-side</a>, so you can
                  easily reuse this theme in your application.
                </div>
                <div className="flex gap-x-2 pt-2">
                  <div
                    className="button h-[1.625rem] cursor-pointer gap-x-2 pl-3 pr-2 text-sm"
                    onClick={() => {
                      const {_render, createPrivyWalletOnLogin, ...rest} = config;
                      const providerCode = `<PrivyProvider createPrivyWalletOnLogin={${createPrivyWalletOnLogin}} config={${JSON.stringify(
                        rest,
                      )}}>{children}</PrivyProvider>`;
                      navigator.clipboard
                        .writeText(providerCode)
                        .then(() => {
                          console.log('Text copied to clipboard');
                        })
                        .catch((error) => {
                          console.error('Failed to copy text to clipboard:', error);
                        });
                    }}
                  >
                    <ClipboardDocumentIcon className="h-4 w-4" strokeWidth={2} />
                    Copy to Clipboard
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
