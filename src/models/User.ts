import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema: Schema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 64,
  },
  password: {
    type: String,
    required: true,
    minlength: 128,
    maxlength: 1024,
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


export default mongoose.model("User", UserSchema);

