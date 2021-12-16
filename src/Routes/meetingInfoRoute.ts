import express, { Router, Request, Response } from "express";
import meetingCollection from "../Models/meetingInfo";
const ObjectId = require("mongodb").ObjectID;
const router: Router = express.Router();

const dateFormatValidation = (date: string, res: Response) => {
  const dateRegex =
    /(?:(09|04|06|11)(\/|-|\.)(0[1-9]|[12]\d|30)(\/|-|\.)((?:19|20)\d\d))|(?:(01|03|05|07|08|10|12)(\/|-|\.)(0[1-9]|[12]\d|3[01])(\/|-|\.)((?:19|20)\d\d))|(?:02(\/|-|\.)(?:(?:(0[1-9]|1\d|2[0-8])(\/|-|\.)((?:19|20)\d\d))|(?:(29)(\/|-|\.)((?:(?:19|20)(?:04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96))|2000))))/;
  if (!dateRegex.test(date))
    return res
      .status(400)
      .send({ message: "Date must be in the format of mm/dd/yyyy" });
};
const meetingDateValidate = (
  meetingDate: object,
  currentDate: object,
  res: Response
) => {
  if (meetingDate.toString() === "Invalid Date")
    return res.status(400).send({ message: "Invalid Date" });
  else if (meetingDate < currentDate)
    return res.status(400).send({ message: "Date is in the past" });
};
const meetingUidValidate = (uid1: String, uid2: String, res: Response) => {
  if (uid1 === uid2)
    return res.status(400).send({ message: "User cannot meet with himself" });
};
const existingMeetingValidate = async (
  exist: any,
  httpMethod: string,
  date: string,
  res: Response
) => {
  if (exist && httpMethod === "POST")
    return res.status(400).send({ message: "Meeting already exists" });
  else if (exist && httpMethod === "PATCH") {
    exist.date = date;
    await exist.save();
    return res.send({ message: "Meeting updated" });
  } else if (!exist && (httpMethod === "PATCH" || httpMethod === "DELETE")) {
    return res.status(400).send({ message: "Meeting does not exist" });
  } else if (exist && httpMethod === "DELETE") {
    await exist.remove();
    return res.send({ message: "Meeting deleted" });
  }
};

router
  .post("/new", async (req: Request, res: Response) => {
    try {
      const { uid1, uid2, date } = req.body;
      //validating the meeting date,uid and checking if the meeting already exists
      const meetingDate = new Date(date);
      const today = new Date();
      const existingMeeting = await meetingCollection.findOne({
        uid1,
        uid2,
        date,
      });
      if (dateFormatValidation(date, res)) return;
      else if (meetingDateValidate(meetingDate, today, res)) return;
      else if (meetingUidValidate(uid1, uid2, res)) return;
      else if (await existingMeetingValidate(existingMeeting, "POST", "", res))
        return;
      const newMeeting = new meetingCollection({
        uid1,
        uid2,
        date,
      });
      //saving the meeting and sending the response
      await newMeeting.save();
      res.send({ meetingUid: newMeeting._id });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .get("/all", async (req: Request, res: Response) => {
    try {
      const meetings = await meetingCollection.find({});
      res.send(meetings);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .patch("/update", async (req: Request, res: Response) => {
    try {
      const { meetingUid, date } = req.body;
      //validating the meeting date and and checking if the meeting already exists
      const meetingDate = new Date(date);
      const today = new Date();
      const existingMeeting = await meetingCollection.findOne({
        _id: ObjectId(meetingUid),
      });
      if (dateFormatValidation(date, res)) return;
      if (meetingDateValidate(meetingDate, today, res)) return;
      existingMeetingValidate(existingMeeting, "PATCH", date, res);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .delete("/delete", async (req: Request, res: Response) => {
    try {
      const { meetingUid } = req.body;
      //checking if the meeting already exists
      const existingMeeting = await meetingCollection.findOne({
        _id: ObjectId(meetingUid),
      });
      existingMeetingValidate(existingMeeting, "DELETE", "", res);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  });

export default router;
