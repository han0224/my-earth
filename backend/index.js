const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // cookie
const app = express();
const port = process.env.PORT || 3300;
// const keys = require("./config/keys");
require("dotenv").config();
const cors = require("cors");

// app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://my-earth.vercel.app"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const session = require("express-session");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log("[error]", error));
const mongoStore = require("connect-mongo");

console.log(process.env.NODE_ENV);

const sessionCookie = {
  secure: true,
  sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 1000,
};

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      path: "/",
      secure: true,
      sameSite: "None",
      httpOnly: true,
    },
  })
);

console.log(sessionCookie);

const userRouter = require("./routers/user");
const timeRouter = require("./routers/time");
const todoRouter = require("./routers/todo");
const goalRouter = require("./routers/goal");

app.use("/user", userRouter);
app.use("/time", timeRouter);
app.use("/todo", todoRouter);
app.use("/goal", goalRouter);

app.get("/", (req, res) => res.send("Develog!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
