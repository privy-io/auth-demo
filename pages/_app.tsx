import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from '../components/Head';
import {PrivyProvider} from '@privy-io/react-auth';
import PlausibleProvider from 'next-plausible';
import {initializeDatadog, setDatadogUser} from '../lib/datadog';
import {useCallback, useMemo, useState} from 'react';
import PrivyConfigContext, {
  defaultIndexConfig,
  PrivyConfigContextType,
  PRIVY_STORAGE_KEY,
} from '../lib/hooks/usePrivyConfig';

function MyApp({Component, pageProps}: AppProps) {
  const [config, setConfig] = useState<PrivyConfigContextType['config']>(() => {
    // Pull out the appearance from local storage if it exists
    const storedConfigRaw =
      typeof window === 'undefined' ? null : window.localStorage.getItem(PRIVY_STORAGE_KEY);
    const storedConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : null;
    return {
      ...defaultIndexConfig,
      appearance: storedConfig?.appearance
        ? storedConfig.appearance
        : defaultIndexConfig.appearance,
    };
  });

  const setConfigWithAppearanceStorage = useCallback(
    (newConfig: PrivyConfigContextType['config']) => {
      window.localStorage.setItem(PRIVY_STORAGE_KEY, JSON.stringify(newConfig));
      return setConfig(newConfig);
    },
    [setConfig],
  );

  useMemo(initializeDatadog, []);

  return (
    <>
      <Head
        url="https://demo.privy.io"
        image="https://privy.io/images/blobby-codey-og.png"
        title="Privy Demo | Onboard all your users to web3"
        description="A simple library to onboard all your users to your web3 product, newcomers and experts alike."
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <PlausibleProvider domain="demo.privy.io">
        <PrivyConfigContext.Provider value={{config, setConfig: setConfigWithAppearanceStorage}}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL}
            onSuccess={(user) => {
              setDatadogUser(user);
            }}
            config={config}
          >
            <Component {...pageProps} />
          </PrivyProvider>
        </PrivyConfigContext.Provider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
