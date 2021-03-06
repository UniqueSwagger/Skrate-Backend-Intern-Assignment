import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ConnectionOptions } from "tls";
import userInfoRoute from "./Routes/userInfoRoute";
import meetingInfoRoute from "./Routes/meetingInfoRoute";
require("dotenv").config();
const port = process.env.PORT || 5000;
const app: Application = express();

//set up database entities
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.spl8q.mongodb.net/skrateAssingmentDb?retryWrites=true&w=majority`;

//middleware
app.use(cors());
app.use(express.json());

//set up database connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectionOptions);

//start the server
app.get("/", async (req: Request, res: Response) => {
  res.send("Skrate User server is running");
});

//implement routes
app.use("/users", userInfoRoute);
app.use("/meetings", meetingInfoRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
