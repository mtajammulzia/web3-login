import { ethers } from "ethers";
import User from "../../models/User.js";
import { ACCESS_TOKEN_SECRET } from "../../utls/constants.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, nex) => {
  const { signature, publicAddress } = req.body;
  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: "Request should have signature and publicAddress" });
  let user = await User.findOne({ publicAddress: publicAddress });
  if (!user)
    return res.status(401).send({
      error: `User with publicAddress ${publicAddress} not found in DB`,
    });
  if (user) {
    const message = user.nonce;
    const signatureAddr = ethers.utils.verifyMessage(message, signature);
    if (signatureAddr === publicAddress) {
      user.nonce = Math.floor(Math.random() * 100000);
      user.save();
      const accessToken = jwt.sign(
        { username: user.username, publicAddress },
        ACCESS_TOKEN_SECRET
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).send({ error: "Signature verification failed" });
    }
  }
};
