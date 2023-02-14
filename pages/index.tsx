import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import {usePrivy} from '@privy-io/react-auth';
import Loading from '../components/loading';
import Image from 'next/image';

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

      <main className="min-w-screen relative min-h-screen overflow-hidden bg-privy-light-blue p-8 sm:p-10">
        <div className="z-1w absolute top-[110px] left-[100px] h-full w-full bg-[url('/blobbies-surfing.svg')] bg-no-repeat"></div>

        <div className="z-100 sm:hidden">
          <div>
            <Image src="/logos/privy-demo.png" height="50px" width="206px" alt="Privy Auth Demo" />
          </div>
        </div>

        <div className="z-100 hidden sm:block">
          <div className="flex flex-row items-center justify-between">
            <div>
              <Image
                src="/logos/privy-demo.png"
                height="50px"
                width="206px"
                alt="Privy Auth Demo"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
                <Link href="/gallery">Gallery</Link>
              </p>
              <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
                <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                  Docs
                </a>
              </p>
              <p className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent">
                <a href="https://docs.privy.io/guide/setup" target="_blank" rel="noreferrer">
                  Get started now
                </a>
              </p>
              <button
                onClick={login}
                className="rounded-md bg-coral py-2 px-4 text-white hover:bg-coralaccent lg:hidden"
              >
                Log in
              </button>
              <button
                onClick={login}
                className="hidden rounded-md bg-coral py-2 px-4 text-white hover:bg-coralaccent lg:block"
              >
                Log in to try it out
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-[100] mt-12 sm:mt-24">
          <div>
            <p className="mt-6 max-w-md text-xl">
              Privy Auth is a simple toolkit for progressive authentication in web3.
            </p>
            <p className="mt-6 max-w-md text-xl">
              Engage your users in web3 within seconds, whether they start with wallet, email or
              social, on desktop and mobile.
            </p>
            <p className="text-md mt-6 hidden sm:block">
              <a
                href="https://lighthouse.mirror.xyz/zq6Tb_YD__KIhvCLhT5M8bOnA43W3peUJa9LYnviiwY"
                className="text-privurple underline hover:cursor-pointer hover:text-privurpleaccent"
                target="_blank"
                rel="noreferrer"
              >
                Learn how we partnered with Lighthouse!
              </a>
            </p>
            <button
              onClick={login}
              className="mt-10 rounded-md bg-coral py-2 px-4 text-white hover:bg-coralaccent sm:hidden"
            >
              Log in to try it out
            </button>
            <button
              onClick={login}
              className="mt-16 hidden rounded-md bg-coral py-2 px-4 text-white hover:bg-coralaccent sm:block"
            >
              Try it out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
