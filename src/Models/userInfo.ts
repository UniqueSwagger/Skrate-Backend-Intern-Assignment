import mongoose from "mongoose";

//User interface
interface User {
  userName: string;
}

//create a schema for users
const userSchema = new mongoose.Schema<User>({
  userName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
