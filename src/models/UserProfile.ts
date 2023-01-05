import mongoose, { Document } from "mongoose";
import { IUser } from "./User";


export interface IUserProfile extends Document {
  user: IUser['_id'];
  name: string;
  profileImage?: string;
  organization: string;
  profession: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema<IUserProfile>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  profileImage: {
    type: String,
    minlength: 10,
    maxlength: 4096,
  },
  organization: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 512,
  },
  profession: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
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


export default mongoose.model("UserProfile", UserSchema);

