import express, { Router, Request, Response } from "express";
import userCollection from "../Models/userInfo";
const ObjectId = require("mongodb").ObjectID;
const router: Router = express.Router();

const userExist = (exist: object | null, httpMethod: string, res: Response) => {
  if (exist && httpMethod === "POST")
    return res.status(400).send({ message: "User already exists" });
  else if (!exist && (httpMethod === "PATCH" || httpMethod === "DELETE"))
    return res.status(400).send({ message: "User does not exist" });
};

router
  .post("/new", async (req: Request, res: Response) => {
    try {
      const { userName } = req.body;
      const existingUser = await userCollection.findOne({ userName });
      if (userExist(existingUser, "POST", res)) return;
      const newUser = new userCollection({ userName });
      await newUser.save();
      res.send({ uid: newUser._id });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .get("/all", async (req: Request, res: Response) => {
    try {
      const users = await userCollection.find({});
      res.send(users);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .patch("/update", async (req: Request, res: Response) => {
    try {
      const { uid, userName } = req.body;
      const existingUser = await userCollection.findOne({ _id: ObjectId(uid) });
      if (userExist(existingUser, "PATCH", res)) return;
      if (existingUser) {
        existingUser.userName = userName;
        await existingUser.save();
        res.send({ message: "User updated" });
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  })
  .delete("/delete", async (req: Request, res: Response) => {
    try {
      const { uid } = req.body;
      const existingUser = await userCollection.findOne({ _id: ObjectId(uid) });
      if (userExist(existingUser, "DELETE", res)) return;
      if (existingUser) {
        await existingUser.remove();
        res.send({ message: "User deleted" });
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  });

export default router;
