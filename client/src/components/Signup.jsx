import { ethers } from "ethers";
import { createUser } from "../services";
import { getProvider } from "../utils";

export function Signup() {
  const connectWallet = async (walletType) => {
    if (!window.ethereum) throw new Error("Metamask not found.");
    const ethProvider = getProvider(walletType);
    const provider = new ethers.providers.Web3Provider(ethProvider);
    const address = await provider.getSigner().getAddress();
    const user = await createUser(address);
    if (!user.error) {
      alert("Signup Successful. Please login!");
    } else {
      alert("User already exists, Please login!");
    }
  };
  return (
    <div className="login">
      <button onClick={() => connectWallet("metamask")} className="btn">
        Signup with Metamask
      </button>
      <button onClick={() => connectWallet("coinbase")} className="btn">
        Signup with Coinbase
      </button>
    </div>
  );
}

export default Signup;
