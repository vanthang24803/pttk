import express, { Router } from "express";

import authRoutes from "./auth";
import salaryRoutes from "./salary";
import recordRoutes from "./record";

const router: Router = express.Router();

router.use("/auth", authRoutes);

router.use("/records", recordRoutes);

router.use("/salaries", salaryRoutes);

export default router;
