import mongoose, { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema<User> = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
