const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

userRouter.get("/", (req, res) => {
  res.send("user");
});

userRouter.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들을 client 에서 가져오면
  // db에 넣어줌
  const user = new User(req.body);
  // 저장, 에러시 json 형식으로 전달
  try {
    user.save();
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

userRouter.post("/login", async (req, res) => {
  const userInfo = User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(401).json({
        err: "유저가 없습니다",
      });
    }

    user.comparePassword(req.body.password, (err, isMath) => {
      if (!isMath) {
        return res.status(401).json({
          err: "비밀번호가 틀렸습니다.",
        });
      }

      req.session.save(function () {
        req.session.userEmail = user.email;
        if (err) {
          return res.status(500).json({ err: err });
        }
        return res.status(200).json({
          email: req.body.email,
          name: user.name,
          time: user.totaltime,
        });
      });
    });
  });
});

userRouter.get("/auth", auth, (req, res) => {
  res.status(200).json({
    email: req.user.email,
    name: req.user.name,
    time: req.user.totaltime,
  });
});

userRouter.get("/logout", (req, res) => {
  if (req.session.userEmail) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
      return res.status(200).end();
    });
  } else {
    res.status(401).json({ err: "로그인 중이 아님" });
  }
});

module.exports = userRouter;
