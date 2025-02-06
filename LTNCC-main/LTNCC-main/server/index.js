import express from "express";
import cors from "cors";
import loginRoute from "./routes/login.js";
import dotenv from "dotenv";
import Students from "./routes/student.js";
import Posts from "./routes/post.js";
import Admins from "./routes/admin.js";
import Teachers from "./routes/teachers.js"
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", loginRoute);

app.use("/", Students);

app.use("/", Posts);

app.use("/", Teachers);

app.use("/", Admins);

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
