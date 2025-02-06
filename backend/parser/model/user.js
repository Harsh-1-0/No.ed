import mongoose, { Schema } from "mongoose";
const adminsSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const webadmin = mongoose.model("admin", adminsSchema);
export default webadmin;
