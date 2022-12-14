import Link from 'next/link';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';

export default function LoginPage() {
  const {login} = usePrivy();

  return (
    <>
      <Head>
        <title>Login · Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col min-h-screen relative min-w-screen bg-privy-light-blue p-10 bg-[url('/blobbies-surfing.svg')]">
        <div className="min-w-full">
          <div className="flex flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-privurple">Welcome!</h1>
            </div>
            <div className="backdrop-blur-3xl p-8 rounded-xl">
              <div className="flex gap-3 items-center justify-center">
                <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                  <a href="https://docs.privy.io" target="_blank" rel="noreferrer">
                    Docs
                  </a>
                </p>
                <p className="underline hover:cursor-pointer text-privurple hover:text-privurpleaccent">
                  <Link href="/gallery">Gallery</Link>
                </p>
                <button
                  onClick={login}
                  className="min-w-[150px] max-w-[150px] text-sm bg-coral hover:bg-coralaccent py-2 px-4 rounded-md text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="columns" className="grid grid-cols-3 mt-24 gap-10">
          <div className="flex flex-col items-center justify-center">
            <p className="max-w-4xl mt-2">
              Privy Auth is a developer library that allows you to easily integrate progressive,
              user centric authentication into your web application.{' '}
            </p>
            <p className="mt-2">
              Onboard your users in seconds, regardless of whether they have a wallet, across mobile
              and desktop.
              <p className="mt-2">Login to try it out!</p>
            </p>
            <div className="flex flex-col gap-4 mt-4"></div>
          </div>

          <div className="flex flex-col items-center justify-center grow"></div>

          <div className="flex flex-col items-center justify-start grow">
            <div className="min-h-[60px] mb-4"></div>
          </div>
        </div>
      </main>
    </>
  );
}
