import { RecordController } from "@/controllers/record";
import uploads from "@/middlewares/upload";
import express, { Router } from "express";

const router: Router = express.Router();

const recordController = new RecordController();

router.get("/department", recordController.getDepartment);

router.post("/", uploads.single("image"), recordController.create);

router.get("/", recordController.findAll);

router.get("/:id", recordController.findById);

router.put("/:id", recordController.update);

router.delete("/:id", recordController.delete);

export default router;
