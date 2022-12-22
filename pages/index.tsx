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
        <title>Privy Auth Demo</title>
      </Head>

      <main className="min-h-screen relative min-w-screen overflow-hidden bg-privy-light-blue p-8 sm:p-10">
        <div className="bg-[url('/blobbies-surfing.svg')] bg-no-repeat h-full w-full absolute top-[110px] left-[100px] z-1w"></div>

        <div className="sm:hidden z-100">
          <h1 className="text-3xl">Privy Auth Demo</h1>
        </div>

        <div className="hidden sm:block z-100">
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="text-3xl">Privy Auth Demo</h1>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                  Docs
                </a>
              </p>
              <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                <a href="https://docs.privy.io/guide/setup" target="_blank" rel="noreferrer">
                  Get started now
                </a>
              </p>
              <button
                onClick={login}
                className="bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white lg:hidden"
              >
                Log in
              </button>
              <button
                onClick={login}
                className="bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white hidden lg:block"
              >
                Log in to try it out
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-24 z-[100]">
          <div>
            <p className="mt-6 text-xl max-w-md">
              Privy Auth is a simple toolkit for progressive authentication in web3.
            </p>
            <p className="mt-6 text-xl max-w-md">
              Engage your users in web3 within seconds, whether they start with wallet, email or
              social, on desktop and mobile.
            </p>
            <p className="mt-6 text-md hidden sm:block">
              <a
                href="https://lighthouse.mirror.xyz/zq6Tb_YD__KIhvCLhT5M8bOnA43W3peUJa9LYnviiwY"
                className="text-privurple hover:text-privurpleaccent underline hover:cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                Learn how we partnered with Lighthouse!
              </a>
            </p>
            <button
              onClick={login}
              className="mt-10 bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white sm:hidden"
            >
              Log in to try it out
            </button>
            <button
              onClick={login}
              className="mt-16 bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white hidden sm:block"
            >
              Try it out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
