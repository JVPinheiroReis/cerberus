import express from "express";
import authRoutes from "./auth.routes";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.use("/auth", authRoutes);

export default router;
