import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: false,
  },
  nonce: {
    type: String,
    required: true,
    default: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ""),
  },
  publicAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("User", UserSchema);
