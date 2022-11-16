import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {usePrivy} from '@privy-io/react-auth';
import Head from 'next/head';

const EmailButton = () => {
  const {user, linkEmail, unlinkEmail} = usePrivy();

  const email = user?.email;

  if (!email) {
    return (
      <button
        onClick={linkEmail}
        className="text-sm bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-white transition-all"
      >
        Connect email
      </button>
    );
  }

  if (email && user.linkedAccounts.length > 1) {
    return (
      <button
        onClick={() => {
          unlinkEmail(email.address);
        }}
        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700"
      >
        Unlink email
      </button>
    );
  }

  return (
    <span className="text-sm bg-gray-200 border-gray-200 py-2 px-4 rounded-md text-gray-900 select-none">
      Email linked
    </span>
  );
};

const WalletButton = () => {
  const {user, linkWallet, unlinkWallet} = usePrivy();

  const wallet = user?.wallet;

  if (!wallet) {
    return (
      <button
        onClick={linkWallet}
        className="text-sm bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-white transition-all"
      >
        Connect wallet
      </button>
    );
  }

  if (wallet && user.linkedAccounts.length > 1) {
    return (
      <button
        onClick={() => {
          unlinkWallet(wallet.address);
        }}
        className="text-sm border border-violet-600 hover:border-violet-700 py-2 px-4 rounded-md text-violet-600 hover:text-violet-700"
      >
        Unlink wallet
      </button>
    );
  }

  return (
    <span className="text-sm bg-gray-200 py-2 px-4 rounded-md text-gray-900 select-none">
      Wallet linked
    </span>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const {ready, authenticated, user, logout} = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  return (
    <>
      <Head>
        <title>Privy Auth Demo</title>
      </Head>

      <main className="flex flex-col min-h-screen px-4 sm:px-20 py-10 bg-privy-light-blue">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
          <button
            onClick={logout}
            className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
          >
            Logout
          </button>
        </div>
        <div className="mt-12 flex gap-4">
          {ready && <EmailButton />}
          {ready && <WalletButton />}
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
