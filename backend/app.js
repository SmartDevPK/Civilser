import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/user.js";
import authRoutes from "./src/route/authRoute.js";


dotenv.config();
const app = express();


app.use(cors());
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
