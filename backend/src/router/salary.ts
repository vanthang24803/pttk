import { SalaryController } from "@/controllers/salary";
import express, { Router } from "express";

const router: Router = express.Router();

const salaryController = new SalaryController();

router.get("/:id", salaryController.findAll);
router.post("/:id", salaryController.create);
router.get("/:id/detail/:salaryId", salaryController.findById);
router.put("/:id/detail/:salaryId", salaryController.update);
router.delete("/:id/detail/:salaryId", salaryController.delete);
router.get("/:id/detail/:salaryId/active", salaryController.active);

export default router;
