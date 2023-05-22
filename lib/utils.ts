// TODO: Release types for WalletType
export const getHumanReadableWalletType = (
  walletType:
    | 'metamask'
    | 'coinbase_wallet'
    | 'wallet_connect'
    | 'metamask_wc'
    | 'phantom'
    | undefined,
) => {
  switch (walletType) {
    case 'metamask':
      return 'MetaMask';
    case 'coinbase_wallet':
      return 'Coinbase Wallet';
    case 'wallet_connect':
      return 'WalletConnect';
    case 'metamask_wc':
      return 'MetaMask mobile';
    case 'phantom':
      return 'Phantom';
    default:
      return 'Unknown Wallet';
  }
};

export const formatWallet = (address: string | undefined): string => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, 5);
  const last = address.slice(address.length - 4, address.length);
  return `${first}...${last}`;
};

export const isEmpty = (value: any) => {
  return value == null || (typeof value === 'string' && value.trim().length === 0);
};
