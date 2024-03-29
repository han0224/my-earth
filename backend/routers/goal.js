const express = require("express");
const { Goal } = require("../models/Goal");
const goalRouter = express.Router();

goalRouter.get("/", (rea, res) => {
  res.send("goal");
});

goalRouter.get("/get/:email", (req, res) => {
  const { email } = req.params;
  try {
    Goal.findOne({ email: email }, (err, goal) => {
      console.log(err, goal);
      if (err) {
        return res.status(500).json({ err: err });
      } else if (goal === null) {
        const goal = new Goal({ email: email });
        goal.save();
        return res.status(200).json({ data: goal });
      } else {
        return res.status(200).json({ data: goal });
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

// [x]body : todo [], do[], done[]
// [o]body : [week / month / year / final] data:[{title:String, content:String, status:Number}]
goalRouter.post("/save/:type/:email", async (req, res) => {
  const { email, type } = req.params;
  try {
    // await Goal.updateOne(
    //   { email: email },
    //   { todo: req.body.todo, do: req.body.do, done: req.body.done },
    //   { upsert: true }
    // );
    await Goal.updateOne(
      { email: email },
      {
        [type]: req.body.data,
      },
      { upsert: true }
    );
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ err: err });
  }
});

module.exports = goalRouter;
