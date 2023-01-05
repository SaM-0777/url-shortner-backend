import mongoose, { Document } from "mongoose";
import { IUser } from "./User";


export interface IShortenLink extends Document {
  user: IUser["_id"];
  code: string;
  redirectUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema<IShortenLink>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  redirectUrl: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 4096,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("ShortenLink", UserSchema);

