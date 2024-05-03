import express from "express";
import { coursePage, introducePage, joinPage, loginPage, mainPage, qrPage, userPage } from "./controller/webController.js";
import { getCourseList, qrCheck } from "./controller/courseController.js";
import { joinUser, loginUser } from "./controller/authController.js";
import { neededAuth, notNeededAuth } from "./middleware/auth.js";

const app = express();
const PORT = 8000;

// 서버 오픈
app.listen(PORT, () => {
  console.log(`서버 오픈 ::: http://localhost:${PORT}`);
});

// EJS
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

// 정적 파일 내보내기
app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

// JSON 형식 변환 미들웨어
app.use(express.json());

// 라우터
app.get("/", mainPage);
app.get("/introduce", introducePage);
app.get("/course", coursePage);
app.get("/login", loginPage);
app.get("/join", joinPage);
app.get("/qr", qrPage);
app.get("/users", userPage);

// api 라우터
app.get("/api/course", notNeededAuth, getCourseList);
app.post("/api/course", neededAuth, qrCheck);
app.post("/api/join", joinUser);
app.post("/api/login", loginUser);
