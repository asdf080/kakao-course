import db from "../config/db.js";

export const getCourseList = async (req, res) => {
  const QUERY = "SELECT c.* FROM course c";
  const result = await db.execute(QUERY).then((result) => result[0]);
  res.status(200).json({ status: "success", message: "성공", data: result });
  console.log(result);
};
