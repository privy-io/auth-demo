import React from 'react';
import {usePrivy} from '@privy-io/privy-react';
import Navbar from './navbar';
import type {NavbarItem} from './navbar';

type Props = {
  children?: React.ReactNode;
  accountId: string;
  appName: string;
  navbarItems: Array<NavbarItem>;
};

export default function Layout({children, accountId, appName, navbarItems}: Props) {
  const {authenticated, user} = usePrivy();
  console.log('usePrivy().authenticated:', authenticated);
  console.log('usePrivy().user:', user);
  if (authenticated == null) {
    return <>Please visit /login (we should automate this...)</>;
  }
  return (
    <>
      <Navbar accountId={accountId} appName={appName} items={navbarItems} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
