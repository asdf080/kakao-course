import jwt from "jsonwebtoken";
import "dotenv/config";
import db from "../config/db.js";

// 토큰이 있으면 유저정보 넣고 없으면 안넣음(로그인 필수X)
export const notNeededAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader?.split(" ")[1];
  if (token && token !== "null") {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ status: "fail", message: "jwt 검증 실패" });
      }
      const QUERY = `SELECT * FROM users WHERE user_no = ?`;
      const user = await db.execute(QUERY, [decoded.no]).then((res) => res[0][0]);

      req.user = user;
      next();
    });
  } else next();
};
// 토큰 있으면 유저정보 넣고 없으면 통과 안됨(로그인 필수O)
export const neededAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader?.split(" ")[1];
  if (token && token !== "null") {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).send({ status: "fail", message: "jwt 검증 실패" });
      }
      const QUERY = `SELECT * FROM users WHERE user_no = ?`;
      const user = await db.execute(QUERY, [decoded.no]).then((res) => res[0][0]);

      req.user = user;
      next();
    });
  } else res.status(403).json({ status: "fail", message: "로그인이 필요합니다." });
};
