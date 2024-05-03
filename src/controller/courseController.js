import db from "../config/db.js";

export const getCourseList = async (req, res) => {
  const no = req.user ? req.user.user_no : null;
  const QUERY = `
  SELECT c.*, uc.user_courses_no FROM course c LEFT JOIN users_course uc
  ON c.course_no = uc.course_no AND uc.user_no = ?`;
  const result = await db.execute(QUERY, [no]).then((result) => result[0]);
  console.log(result);
  console.log("=======");
  res.status(200).json({ status: "success", message: "성공", data: result });
};
