import { Request, Response } from "express";
import { AppDataSource } from "@repo/db";
import { User } from "@repo/db";
import { logger } from "@repo/logger";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId: telegramId, userName: name } = req.body;

    const existingUser = await userRepository.findOne({
      where: { telegramId },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const userData = { telegramId, name };
    const user = userRepository.create(userData);
    await userRepository.save(user);

    return res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user = userRepository.find();
    return res.status(201).json(user);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};
