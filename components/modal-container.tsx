import {MegaphoneIcon} from '@heroicons/react/24/outline';
import {usePrivy} from '@privy-io/react-auth';
import {useEffect} from 'react';

export default function ModalContainer({className}: {className?: string}) {
  const {login} = usePrivy();
  useEffect(() => {
    login();
  }, []);

  return <div id="render-privy"></div>;
}
