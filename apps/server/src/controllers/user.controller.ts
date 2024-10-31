import { Request, Response } from "express";
import { AppDataSource } from "@repo/db";
import { User } from "@repo/db";

export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.find();
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};
