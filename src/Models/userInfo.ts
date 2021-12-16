import { Date, Schema, model } from "mongoose";

//User interface
interface User {
  userName: string;
  createdAt: Date;
}

//create a schema for users
const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
});

export default model<User>("userCollection", userSchema);
