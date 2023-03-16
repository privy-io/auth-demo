// TODO: Release types for WalletType
export const getHumanReadableWalletType = (
  walletType: 'metamask' | 'coinbase_wallet' | 'wallet_connect' | 'metamask_wc' | undefined,
) => {
  switch (walletType) {
    case 'metamask':
      return 'MetaMask'
    case 'coinbase_wallet':
      return 'Coinbase Wallet'
    case 'wallet_connect':
      return 'WalletConnect'
    case 'metamask_wc':
      return 'MetaMask mobile'
    default:
    return 'Unknown Wallet';
  };
};
