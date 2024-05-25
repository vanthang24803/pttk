import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { JwtGenerator } from "@/utils";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export class AuthController {
  async register(req: Request, res: Response) {
    const { password } = req.body;

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hashPassword,
      },
    });

    return res.status(200).json({ account: newUser });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const exitingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!exitingUser) return res.status(401).send("Unauthorized");

    const matchPassword = bcrypt.compareSync(password, exitingUser.password);

    if (!matchPassword) return res.status(401).send("Unauthorized");

    const token = JwtGenerator.generateToken(
      { id: exitingUser.id },
      secret!,
      "30d"
    );

    return res.status(200).json({ token });
  }

  async profile(req: Request, res: Response) {
    const token = req.headers.authorization;
    const tokenValue = token?.replace("Bearer ", "");

    if (!tokenValue) return res.status(401);

    const decoded = jwt.decode(tokenValue) as Payload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.data.id,
      },
    });

    //

    if (!user) return res.status(401);

    return res.status(200).json({
      profile: user,
    });
  }
}

type Payload = {
  data: {
    id: string;
  };
};
