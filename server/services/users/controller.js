import User from "../../models/User.js";

export const fetch = async (req, res, next) => {
  const publicAddress = req.params.publicAddress;
  const user = await User.findOne({ publicAddress: publicAddress });
  if (user) {
    res.status(200).json({ publicAddr: user.publicAddress, nonce: user.nonce });
  } else {
    res.status(400).send({ error: "No user associated with this address" });
  }
};

export const create = async (req, res, next) => {
  const publicAddress = req.params.publicAddress;
  const user = await User.findOne({ publicAddress: publicAddress });
  if (user) {
    res
      .status(400)
      .send({ error: "User already associated with this address" });
  } else {
    const newUser = new User({
      username: "",
      nonce: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, ""),
      publicAddress: publicAddress,
    });
    const success = await newUser.save();
    if (success) {
      res
        .status(200)
        .json({ publicAddr: newUser.publicAddress, nonce: newUser.nonce });
    }
  }
};
