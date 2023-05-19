import {useRouter} from 'next/router';
import Head from 'next/head';
import {usePrivy} from '@privy-io/react-auth';
import Loading from '../components/loading';
import {Header} from '../components/header';
import CanvasSidebarAuthConfig from '../components/canvas-sidebar-auth-config';
import PrivyBlobIcon from '../components/icons/outline/privy-blob';
import {ArrowDownOnSquareIcon, ArrowRightIcon} from '@heroicons/react/24/outline';
import CanvasCardHeader from '../components/canvas-card-header';
import CanvasCard from '../components/canvas-card';
import ModalContainer from '../components/modal-container';
import CanvasContainer from '../components/canvas-container';
import Canvas from '../components/canvas';
import CanvasRow from '../components/canvas-row';

export default function LoginPage() {
  const router = useRouter();
  const {ready, authenticated, login} = usePrivy();

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
      <div className="flex h-full max-w-screen-2xl flex-col px-6 pb-6">
        <Header />
        <CanvasContainer>
          <CanvasSidebarAuthConfig />
          {/* start: canvas-panel */}
          <Canvas className="pl-24">
            {/* start: modal-column */}
            <ModalContainer />
            {/* end: modal-column */}
            <CanvasRow>
              {/* start: cta */}
              <CanvasCard className="!border-none bg-gradient-to-r from-indigo-400 to-red-300 !p-1">
                <div className="rounded-lg bg-white p-4">
                  <CanvasCardHeader>
                    <PrivyBlobIcon className="h-5 w-5" strokeWidth={2} />
                    Explore Privy
                  </CanvasCardHeader>
                  <div className="pb-2 text-sm text-gray-400">
                    The easiest way to onboard all of your users to web3
                  </div>
                  <div className="text-sm">Sign in to the demo to access the dev tools.</div>
                  <div className="flex gap-x-2 pt-2">
                    <a
                      href="https://docs.privy.io"
                      className="button-secondary h-[1.625rem] gap-x-2 pl-3 pr-2 text-sm"
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
                <div className="pb-2 text-sm text-gray-400">
                  Privy&apos;s components can be customized <a href="#">client-side</a>, so you can
                  easily reuse this theme in your application.
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
