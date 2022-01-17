import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { fetchUser, signMessage, authenticateUser } from "../services";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { getProvider } from "../utils";

export function Login() {
  const auth = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleClick = async (walletType) => {
    if (!window.ethereum) throw new Error("Metamask not found.");
    const ethProvider = getProvider(walletType);
    const provider = new ethers.providers.Web3Provider(ethProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const response = await fetchUser(address);
    if (!response.error) {
      const { signature } = await signMessage(signer, response.nonce);
      const { accessToken, error } = await authenticateUser(address, signature);
      if (error) {
        throw new Error("User not authenticated");
      } else {
        const authUser = {
          username: address,
          accessToken: accessToken,
        };
        auth.setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
        console.log(auth.user);
        setRedirect(true);
      }
    } else {
      alert("No user found, please sign up");
    }
  };

  return auth.user.accessToken === "" ? (
    <div className="login">
      <button onClick={() => handleClick("metamask")} className="btn">
        Login with Metamask
      </button>
      <button onClick={() => handleClick("coinbase")} className="btn">
        Login with Coinbase
      </button>
    </div>
  ) : (
    redirect && <Navigate to="/landing" replace={true} />
  );
}

export default Login;