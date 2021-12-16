import { Response } from "express";

const userExist = (exist: object | null, httpMethod: string, res: Response) => {
  if (exist && httpMethod === "POST")
    return res.status(400).send({ message: "User already exists" });
  else if (!exist && (httpMethod === "PATCH" || httpMethod === "DELETE"))
    return res.status(400).send({ message: "User does not exist" });
};

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

export {
  userExist,
  dateFormatValidation,
  meetingDateValidate,
  meetingUidValidate,
  existingMeetingValidate,
};
