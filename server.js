// Load environment variables first
import "dotenv/config";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "1.0.0.1"]);
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import snippetRoutes from "./routes/snippetRoutes.js";

// Connect to database
connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
