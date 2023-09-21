import type {PrivyClientConfig} from '@privy-io/react-auth';
import {createContext} from 'react';

export type PrivyConfigContextType = {
  config: PrivyClientConfig;
  setConfig?: (config: PrivyClientConfig) => void;
};

export const privyLogo = 'https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png';
export const privyLogoDark = 'https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy-dark.png';
export const PRIVY_STORAGE_KEY = 'privy-config';

export const defaultIndexConfig: PrivyClientConfig = {
  appearance: {
    accentColor: '#6A6FF5',
    theme: '#FFFFFF',
    showWalletLoginFirst: true,
    logo: privyLogo,
  },
  loginMethods: ['email', 'wallet', 'google', 'apple', 'github', 'discord'],
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
  },
  // @ts-expect-error internal api
  _render: {
    inDialog: false,
    inParentNodeId: 'render-privy',
  },
};

export const defaultDashboardConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
  },
  // @ts-expect-error internal api
  _render: {
    inDialog: true,
    inParentNodeId: null,
  },
};

const PrivyConfigContext = createContext<PrivyConfigContextType>({config: {}});
export default PrivyConfigContext;
