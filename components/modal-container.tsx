import {usePrivy} from '@privy-io/react-auth';
import {useContext, useEffect} from 'react';
import PrivyConfigContext from '../lib/hooks/usePrivyConfig';

export default function ModalContainer() {
  const {login} = usePrivy();
  const {config, setConfig} = useContext(PrivyConfigContext);
  useEffect(() => {
    setConfig?.({
      ...config,
      _render: {
        inDialog: false,
        inParentNodeId: 'render-privy',
      },
    });
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="render-privy"></div>;
}
