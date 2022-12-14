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
          <h1 className="text-5xl font-bold text-gray-800">Privy Auth</h1>
          <p className="text-xl text-gray-700 px-10 pt-4">
            Privy Auth is a developer library that allows you to easily integrate progressive, user
            centric authentication into your web application.
          </p>
          <p className="text-xl text-gray-700 px-10 pt-4">Try it out!</p>
          <div>
            <Portal style={{maxWidth: '100%', height: 'auto'}} />
          </div>
          <div className="mt-6 flex justify-center text-center mb-10">
            <button
              className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-xl text-white rounded-lg"
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
