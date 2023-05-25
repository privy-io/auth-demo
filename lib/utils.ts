// TODO: Release types for WalletType
export const getHumanReadableWalletType = (
  walletType:
    | 'metamask'
    | 'coinbase_wallet'
    | 'wallet_connect'
    | 'phantom'
    | 'embedded'
    | undefined,
) => {
  switch (walletType) {
    case 'metamask':
      return 'MetaMask';
    case 'coinbase_wallet':
      return 'Coinbase Wallet';
    case 'wallet_connect':
      return 'WalletConnect';
    case 'phantom':
      return 'Phantom';
    case 'embedded':
      return 'Privy';
    default:
      return 'Unknown Wallet';
  }
};

export const formatWallet = (address: string | undefined): string => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, 5);
  const last = address.slice(address.length - 3, address.length);
  return `${first}...${last}`;
};

export const isEmpty = (value: any) => {
  return value == null || (typeof value === 'string' && value.trim().length === 0);
};
