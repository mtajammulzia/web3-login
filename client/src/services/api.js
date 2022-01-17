export const fetchUser = async (address) => {
  const response = await fetch(`http://localhost:5000/users/${address}`);
  const data = await response.json();
  return data;
};

export const createUser = async (address) => {
  const response = await fetch(`http://localhost:5000/users/${address}`, {
    method: "POST",
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const signMessage = async (signer, nonce) => {
  try {
    const signature = await signer.signMessage(nonce);
    return { signature };
  } catch (err) {
    console.log(err);
  }
};

export const authenticateUser = async (publicAddress, signature) => {
  const response = await fetch(`http://localhost:5000/auth`, {
    body: JSON.stringify({ publicAddress, signature }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = await response.json();
  console.log(data);
  return data;
};
