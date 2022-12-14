import Portal from '../components/portal';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';

export default function LoginPage() {
  const {login} = usePrivy();

  return (
    <>
      <Head>
        <title>Login · Privy Auth Demo</title>
      </Head>

      <main className="flex min-h-screen min-w-full bg-privy-light-blue justify-center">
        <div className="flex flex-col flex-1 p-6 justify-center items-center max-w-3xl">
          <h1 className="text-5xl font-bold text-slate-800">Privy Auth</h1>
          <p className="text-xl text-slate-700 px-10 pt-4">
            Privy is a developer library for progressive authentication in web3.
            <br />
            <br />
            Onboard your users in seconds, regardless of whether they have a wallet, across mobile
            and desktop. Try it out below!
          </p>
          <div>
            <Portal style={{maxWidth: '100%', height: 'auto'}} />
          </div>
          <div className="mt-6 flex justify-center text-center mb-10">
            <button
              className="bg-slate-800 hover:bg-slate-900 py-3 px-6 text-xl text-white rounded-lg"
              onClick={login}
            >
              Log in
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
