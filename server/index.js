import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authRoute.js";
import taskRouter from "./routes/taskRoute.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Api EndPoint
app.get("/", (req, res) => {
  res.json({ message: "Task App Api" });
});

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.listen(port, () => {
  console.log(`Server Start on port:${port}`);
});
