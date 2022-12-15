import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import {usePrivy} from '@privy-io/react-auth';
import Loading from '../components/loading';

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
        <title>Login · Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col min-h-screen relative min-w-screen bg-privy-light-blue p-10 bg-[url('/blobbies-surfing.svg')] bg-no-repeat">
        <div className="min-w-full">
          <div className="flex flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-privurple">Welcome!</h1>
            </div>
            <div className="flex gap-3 items-center justify-center">
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                  Docs
                </a>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p>
            </div>
          </div>
        </div>

        <div id="columns" className="grid grid-cols-3 mt-24 gap-10">
          <div className="flex flex-col items-start justify-center -sm:col-span-3">
            <p className="max-w-4xl mt-2">
              Privy Auth is a simple library that allows you to easily onboard users into web3.{' '}
            </p>
            <p className="mt-2">
              Engage your users in seconds, regardless of whether they have a wallet, across mobile
              and desktop.
            </p>
            <button
              onClick={login}
              className="mt-8 min-w-[200px] max-w-[200px] bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
            >
              Try out Privy Auth!
            </button>
          </div>

          <div className="flex flex-col items-center justify-center grow -sm:hidden"></div>

          <div className="flex flex-col items-center justify-start grow -sm:hidden">
            <div className="min-h-[60px] mb-4"></div>
          </div>
        </div>
      </main>
    </>
  );
}
