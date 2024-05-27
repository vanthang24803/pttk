import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

export class SalaryController {
  async findAll(req: Request, res: Response) {
    const { id } = req.params;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    const salaries = await prisma.salary.findMany({
      where: {
        teacher: exitingRecord,
      },
    });

    return res.status(200).json(salaries);
  }

  async create(req: Request, res: Response) {
    const { id } = req.params;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    const { amount, workDay, offDay, benefit, base, scale } = req.body;

    const newSalary = await prisma.salary.create({
      data: {
        amount,
        base,
        scale,
        workDay: Number(workDay),
        offDay: Number(offDay),
        benefit: Number(benefit),
        teacherId: id,
      },
    });

    return res.status(200).json(newSalary);
  }

  async findById(req: Request, res: Response) {
    const { id, salaryId } = req.params;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    const salary = await prisma.salary.findUnique({
      where: {
        id: salaryId,
      },
    });

    return res.status(200).json(salary);
  }

  async update(req: Request, res: Response) {
    const { id, salaryId } = req.params;

    const { workDay, offDay, benefit, amount } = req.body;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    const updateRecord = await prisma.salary.update({
      where: {
        id: salaryId,
      },
      data: {
        amount,
        workDay: Number(workDay),
        offDay: Number(offDay),
        benefit: Number(benefit),
      },
    });

    return res.status(200).json(updateRecord);
  }

  async active(req: Request, res: Response) {
    const { id, salaryId } = req.params;

    const { workDay, offDay, benefit, amount } = req.body;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    await prisma.salary.update({
      where: {
        id: salaryId,
      },
      data: {
        status: true,
      },
    });

    return res.status(200).json({ msg: "Success" });
  }

  async delete(req: Request, res: Response) {
    const { id, salaryId } = req.params;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord)
      return res.status(404).json({ msg: "Record not found" });

    await prisma.salary.delete({
      where: {
        id: salaryId,
      },
    });

    return res.status(200).json({
      msg: "Salary deleted",
    });
  }
}
