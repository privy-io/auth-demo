import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { usePrivy } from '@privy-io/react-auth';
import Loading from '../components/loading';

export default function LoginPage() {
  const router = useRouter();
  const { ready, authenticated, login } = usePrivy();

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

      <main className="overflow-hidden relative p-8 min-h-screen sm:p-10 min-w-screen bg-privy-light-blue">
        <div className="bg-[url('/blobbies-surfing.svg')] bg-no-repeat h-full w-full absolute top-[110px] left-[100px] z-1w"></div>

        <div className="sm:hidden z-100">
          <h1 className="text-3xl">Privy Auth Demo</h1>
        </div>

        <div className="hidden sm:block z-100">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl">Privy Auth Demo</h1>
            </div>
            <div className="flex gap-4 justify-center items-center">
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
                className="py-2 px-4 text-white rounded-md lg:hidden bg-coral hover:bg-coralaccent"
              >
                Log in
              </button>
              <button
                onClick={login}
                className="hidden py-2 px-4 text-white rounded-md lg:block bg-coral hover:bg-coralaccent"
              >
                Log in to try it out
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-24 z-[100]">
          <div>
            <p className="mt-6 max-w-md text-xl">
              Privy Auth is a simple toolkit for progressive authentication in web3.
            </p>
            <p className="mt-6 max-w-md text-xl">
              Engage your users in web3 within seconds, whether they start with wallet, email or
              social, on desktop and mobile.
            </p>
            <p className="hidden mt-6 sm:block text-md">
              <a
                href="https://lighthouse.mirror.xyz/zq6Tb_YD__KIhvCLhT5M8bOnA43W3peUJa9LYnviiwY"
                className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent"
                target="_blank"
                rel="noreferrer"
              >
                Learn how we partnered with Lighthouse!
              </a>
            </p>
            <button
              onClick={login}
              className="py-2 px-4 mt-10 text-white rounded-md sm:hidden bg-coral hover:bg-coralaccent"
            >
              Log in to try it out
            </button>
            <button
              onClick={login}
              className="hidden py-2 px-4 mt-16 text-white rounded-md sm:block bg-coral hover:bg-coralaccent"
            >
              Try it out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
