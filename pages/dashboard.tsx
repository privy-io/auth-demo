import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const {ready, authenticated, user, logout, linkEmail, linkWallet, unlinkEmail, unlinkWallet} =
    usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const email = user?.email;
  const wallet = user?.wallet;

  return (
    <>
      <Head>
        <title>Mini Demo · Privy</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-10 bg-privy-light-blue">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">Privy Console</h1>
          <button
            onClick={logout}
            className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
          >
            Logout
          </button>
        </div>
        <div className="mt-12 flex gap-4">
          {email ? (
            <button
              onClick={() => {
                unlinkEmail(email.address);
              }}
              className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
            >
              Unlink email
            </button>
          ) : (
            <button
              onClick={linkEmail}
              className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
            >
              Connect email
            </button>
          )}
          {wallet ? (
            <button
              onClick={() => {
                unlinkWallet(wallet.address);
              }}
              className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white"
            >
              Unlink wallet
            </button>
          ) : (
            <button
              onClick={linkWallet}
              className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
            >
              Connect wallet
            </button>
          )}
        </div>

        <p className="mt-6 font-bold uppercase text-sm text-gray-600">User object</p>
        <textarea
          value={JSON.stringify(user, null, 2)}
          className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2"
          rows={20}
          disabled
        />
      </main>
    </>
  );
}
