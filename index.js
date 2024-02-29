import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connection successfull`);
}

app.use(express.json());

app.use("/v1/auth", userRoutes);
app.use("/v1/student", studentRoutes);
app.use("/v1/teacher", teacherRoutes);
app.use("/v1/admin", courseRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000...");
});
