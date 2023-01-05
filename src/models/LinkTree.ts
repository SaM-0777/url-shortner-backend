import mongoose, { Document } from "mongoose";
import { IUser } from "./User";


interface ITree extends Document {
  title: string;
  domain: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface ILinkTree extends Document {
  user: IUser["_id"];
  tree: mongoose.Types.DocumentArray<ITree>;
  createdAt: Date;
  updatedAt: Date;
};

const TreeSchema = new mongoose.Schema<ITree>({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
  },
  domain: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
  },
  url: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 2048,
  }
});

const UserSchema = new mongoose.Schema<ILinkTree>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tree: {
    type: [TreeSchema],
    required: true,
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


export default mongoose.model("LinkTree", UserSchema);

