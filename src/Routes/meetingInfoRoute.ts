import express, { Router, Request, Response } from "express";
import meetingCollection from "../Models/meetingInfo";
import {
  dateFormatValidation,
  existingMeetingValidate,
  meetingDateValidate,
  meetingUidValidate,
} from "../Validations/validations";
const ObjectId = require("mongodb").ObjectID;
const router: Router = express.Router();

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
