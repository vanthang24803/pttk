import { SalaryController } from "@/controllers/salary";
import express, { Router } from "express";

const router: Router = express.Router();

const salaryController = new SalaryController();

router.get("/:id", salaryController.findAll);
router.post("/:id", salaryController.create);

router.delete("/:id/detail/:salaryId", salaryController.delete);

export default router;
