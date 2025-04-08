import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/user.js";
import authRoutes from "./src/route/authRoute.js";
import path from "path";


dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}



app.use(express.json());


app.use("/", authRoutes);


(async () => {
  try {
    await connectDB();
    console.log("MongoDB connection successful");

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
})();