import { Date, Schema, model } from "mongoose";

//meeting interface
interface Meeting {
  uid1: string;
  uid2: string;
  date: string;
  createdAt: Date;
}

//create a schema for meetings
const meetingSchema = new Schema<Meeting>({
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
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
});

export default model("meetingCollection", meetingSchema);
