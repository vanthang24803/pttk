import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";

export class RecordController {
  async getDepartment(req: Request, res: Response) {
    const departments = [
      "CNTT",
      "Cơ điện",
      "Dầu khí và năng lượng",
      "Khoa học và kỹ thuật địa chất",
      "Kinh tế - QTKD",
      "Mỏ",
      "Môi trường",
      "Trắc địa - Bản đồ - Quản lý đất đai",
      "Xây dựng",
      "Khoa học cơ bản",
      "Lý luận chính trị",
      "Giáo dục quốc phòng",
    ];

    for (const department of departments) {
      await prisma.department.create({
        data: {
          name: department,
        },
      });
    }

    return res.status(200).json({ message: "Create Department Success" });
  }

  async create(req: Request, res: Response) {
    const newRecord = await prisma.teacher.create({
      data: {
        ...req.body,
      },
    });

    return res.status(200).json({ record: newRecord });
  }

  async findAll(req: Request, res: Response) {
    const records = await prisma.teacher.findMany();

    return records;
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const exitingRecord = await prisma.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!exitingRecord) return res.status(404);

    return res.status(200).json(exitingRecord);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      firstMidName,
      lastName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      position,
      degree,
      salaryScale,
      benefitSalary,
      baseSalary,
    } = req.body;

    const updateRecord = await prisma.teacher.update({
      where: {
        id,
      },
      data: {
        email,
        firstMidName,
        lastName,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        position,
        degree,
        salaryScale,
        benefitSalary,
        baseSalary,
      },
    });

    return updateRecord;
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.teacher.delete({ where: { id } });
  }
}
