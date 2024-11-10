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

    const userExists = await userRepository.existsBy({ telegramId });

    if (userExists) {
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

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId: telegramId, username: name } = req.body;

    const userExists = await userRepository.existsBy({ telegramId });

    if (!userExists) {
      return res.status(404).json({ message: "User not exists" });
    }

    await userRepository.update({ telegramId }, { name });

    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};
