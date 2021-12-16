import mongoose from "mongoose";

//meeting interface
interface Meeting {
  uid1: string;
  uid2: string;
  date: string;
}

//create a schema for meetings

const meetingSchema = new mongoose.Schema<Meeting>({
  uid1: {
    type: String,
    required: true,
  },
  uid2: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
