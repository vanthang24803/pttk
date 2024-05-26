import { Request, Response } from "express";
import { prisma } from "@/lib/prisma";
import UploadService from "@/utils/upload";

export class RecordController {
  // async getDepartment(req: Request, res: Response) {
  //   const departments = [
  //     "CNTT",
  //     "Cơ điện",
  //     "Dầu khí và năng lượng",
  //     "Khoa học và kỹ thuật địa chất",
  //     "Kinh tế - QTKD",
  //     "Mỏ",
  //     "Môi trường",
  //     "Trắc địa - Bản đồ - Quản lý đất đai",
  //     "Xây dựng",
  //     "Khoa học cơ bản",
  //     "Lý luận chính trị",
  //     "Giáo dục quốc phòng",
  //   ];

  //   for (const department of departments) {
  //     await prisma.department.create({
  //       data: {
  //         name: department,
  //       },
  //     });
  //   }

  //   return res.status(200).json({ message: "Create Department Success" });
  // }

  async getDepartment(req: Request, res: Response) {
    const departments = await prisma.department.findMany();

    return res.status(200).json(departments);
  }

  async create(req: Request, res: Response) {
    const {
      code,
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
      departmentId,
    } = req.body;

    const image = req.file as Express.Multer.File | undefined;

    const url = await UploadService.uploadSingle(image);

    const exitingRecordByEmail = await prisma.teacher.findFirst({
      where: {
        email,
      },
    });

    const exitingRecordByCode = await prisma.teacher.findFirst({
      where: {
        code,
      },
    });

    if (exitingRecordByCode || exitingRecordByEmail) {
      return res.status(404).json({ msg: "Existed Record" });
    }

    const exitingDepartment = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!exitingDepartment)
      return res.status(404).json({ msg: "Department not found" });

    const newRecord = await prisma.teacher.create({
      data: {
        firstMidName,
        email,
        gender:  gender === "men" ? true : false,
        image: url!,
        dateOfBirth,
        lastName,
        address,
        baseSalary: Number(baseSalary),
        benefitSalary: Number(benefitSalary),
        code,
        degree,
        phoneNumber,
        position,
        salaryScale: Number(salaryScale),
        departments: {
          connect: { id: departmentId },
        },
      },
    });

    return res.status(200).json({message : "Create successfully"});
  }

  async findAll(req: Request, res: Response) {
    const records = await prisma.teacher.findMany({
      include: {
        departments: true,
        salaries: true,
      },
      orderBy: {
        createAt : 'desc'
      }
    });

    return res.status(200).json(records);
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

    return res.status(200).json(updateRecord);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.teacher.delete({ where: { id } });

    return res.status(200).json({ msg: "Deleted Success!" });
  }
}
