import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { fetchUser, authenticateUser } from "../services";
import { Navigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { getProvider, signMessage } from "../utils";

export function Login() {
  const auth = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = async (walletType) => {
    if (!window.ethereum) throw new Error("Metamask not found.");
    const ethProvider = getProvider(walletType);
    if (ethProvider) {
      const provider = new ethers.providers.Web3Provider(ethProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const response = await fetchUser(address);
      if (!response.error) {
        const { signature } = await signMessage(signer, response.nonce);
        const { accessToken, error } = await authenticateUser(
          address,
          signature
        );
        if (error) {
          throw new Error("User not authenticated");
        } else {
          const authUser = {
            username: address,
            accessToken: accessToken,
          };
          auth.setUser(authUser);
          localStorage.setItem("user", JSON.stringify(authUser));
          setRedirect(true);
        }
      } else {
        alert("No user found, please sign up");
      }
    } else {
      alert(`${walletType.toUpperCase()} wallet not found!`);
    }
  };

  return auth.user.accessToken === "" ? (
    <div className="login-page">
      <button onClick={() => handleLogin("metamask")} className="btn">
        Login with Metamask
      </button>
      <button onClick={() => handleLogin("coinbase")} className="btn">
        Login with Coinbase
      </button>
    </div>
  ) : (
    redirect && <Navigate to="/landing" replace={true} />
  );
}

export default Login;
