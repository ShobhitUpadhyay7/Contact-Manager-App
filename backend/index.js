import express from "express";
import userRouter from "./routes/userRoute.js";
import contactRouter from "./routes/contactRoutes.js";
import dotenv from "dotenv";
import connectDb from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
connectDb();

const app = express();
app.use(cors());

// Add these two lines BEFORE your routes
app.use(bodyParser.json()); // For JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // For form data

app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Srver running at port: ${port}`);
});
