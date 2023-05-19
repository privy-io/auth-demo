import type {PrivyClientConfig} from '@privy-io/react-auth';
import {createContext} from 'react';

type PrivyDemoConfig = PrivyClientConfig & {createPrivyWalletOnLogin?: boolean};

export type PrivyConfigContextType = {
  config: PrivyDemoConfig;
  setConfig?: (config: PrivyDemoConfig) => void;
};

const PrivyConfigContext = createContext<PrivyConfigContextType>({config: {}});
export default PrivyConfigContext;
