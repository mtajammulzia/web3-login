/**
 * API call to fetch user associated with provided address, if it results in faliure return object will have an error property.
 * @param {*} address - public address of user
 * @returns user's public address and nonce.
 */
export const fetchUser = async (address) => {
  const response = await fetch(`http://localhost:5000/users/${address}`);
  const data = await response.json();
  return data;
};

/**
 * API call to create and save user with provided address in DB, if it results in faliure return object will have an error property.
 * @param {*} address - public address of user
 * @returns saved user's object from DB.
 */
export const createUser = async (address) => {
  const response = await fetch(`http://localhost:5000/users/${address}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

/**
 * Authenticates user based on signature and public address, if it results in faliure return object will have an error property.
 * @param {*} publicAddress - public address of user.
 * @param {*} signature - signed nonce by user.
 * @returns user object from DB.
 */
export const authenticateUser = async (publicAddress, signature) => {
  const response = await fetch(`http://localhost:5000/auth`, {
    body: JSON.stringify({ publicAddress, signature }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const data = await response.json();
  return data;
};
