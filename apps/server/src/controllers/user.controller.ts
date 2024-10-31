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
    const user = userRepository.create(req.body);
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
