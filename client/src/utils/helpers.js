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

/**
 * Signs the fethced nonce from DB.
 * @param {*} signer - signer object of user created with ethers.
 * @param {*} nonce - nonce associated with user's profile.
 * @returns signature.
 */
export const signMessage = async (signer, nonce) => {
  try {
    const signature = await signer.signMessage(nonce);
    return { signature };
  } catch (err) {
    console.log(err);
  }
};
