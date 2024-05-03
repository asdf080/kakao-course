import db from "../config/db.js";
import bcrypt from "bcrypt";

export const joinUser = async (req, res) => {
  const { userId, userPW, userName } = req.body;
  // 1. 유저 아이디가 중복인지 확인(db와 비교)
  const QUERY1 = `SELECT user_no FROM users WHERE user_id = ?`;
  const existUser = await db.execute(QUERY1, [userId]).then((res) => res[0][0]);
  // 중복이면 실행됨
  if (existUser?.user_no !== undefined) {
    res.status(400).json({ status: "fail", message: "중복된 아이디입니다." });
    return;
  }

  // 2. 비번 암호화
  const encryptPW = await bcrypt.hash(userPW, 8);

  // 3. db user테이블에 데이터 저장
  const QUERY2 = `INSERT INTO users (user_id, user_password, user_name) VALUES (?, ?, ?)`;
  await db.execute(QUERY2, [userId, encryptPW, userName]);

  res.status(201).json({ status: "success", message: "회원가입이 완료되었습니다." });
};

export const loginUser = async (req, res) => {
  const { userId, userPW } = req.body;
  // 1. 아이디에 맞는 사용자 찾기/없으면 에러

  // 2. 비밀번호 찾기

  // 3. 회원 인증키 발급
};
