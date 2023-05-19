import type {PrivyClientConfig} from '@privy-io/react-auth';
import {createContext} from 'react';

const PrivyConfigContext = createContext<{
  config: PrivyClientConfig;
  setConfig?: (config: PrivyClientConfig) => void;
}>({config: {}});
export default PrivyConfigContext;
