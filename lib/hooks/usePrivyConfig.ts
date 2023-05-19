import type {PrivyClientConfig} from '@privy-io/react-auth';
import {createContext} from 'react';

const PrivyConfigContext = createContext<PrivyClientConfig>({});
export default PrivyConfigContext;
