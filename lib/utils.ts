// TODO: Release types for WalletType
export const getHumanReadableWalletType = (
  walletType: 'metamask' | 'coinbase_wallet' | 'wallet_connect' | undefined,
) => {
  if (walletType === 'metamask') return 'Metamask';
  if (walletType === 'coinbase_wallet') return 'Coinbase Wallet';
  if (walletType === 'wallet_connect') return 'WalletConnect';

  return 'Unknown Wallet';
};
