import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
import PlausibleProvider from 'next-plausible';
import {initializeDatadog, setDatadogUser} from '../lib/datadog';
import {useMemo, useState} from 'react';
import PrivyConfigContext, {
  defaultIndexConfig,
  PrivyConfigContextType,
} from '../lib/hooks/usePrivyConfig';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const [config, setConfig] = useState<PrivyConfigContextType['config']>(defaultIndexConfig);

  useMemo(initializeDatadog, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/manifest.json" />

        <title>Privy Auth Demo</title>
        <meta name="description" content="Privy Auth Demo" />
      </Head>
      <PlausibleProvider domain="demo.privy.io">
        <PrivyConfigContext.Provider value={{config, setConfig}}>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
            apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL}
            onSuccess={(user) => {
              setDatadogUser(user);
              router.push('/dashboard');
            }}
            config={config}
            createPrivyWalletOnLogin={config.createPrivyWalletOnLogin}
          >
            <Component {...pageProps} />
          </PrivyProvider>
        </PrivyConfigContext.Provider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
