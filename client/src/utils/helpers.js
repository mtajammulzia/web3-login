/**
 * finds if the request is made from metmask wallet or coinbase wallet.
 * @param {*} walletType - string: wallet type = metamask || coinbase
 * @returns web3 provider for provided walletType
 */
export const getProvider = (walletType) => {
  if (!window.ethereum) return false;
  if (walletType === "metamask") {
    return window.ethereum.providers.find(
      (provider) => provider.isMetaMask === true
    );
  } else if ((walletType = "coinbase")) {
    return window.ethereum.providers.find(
      (provider) => provider.isCoinbaseWallet === true
    );
  }
};
