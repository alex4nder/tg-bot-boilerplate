import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);

router.post("/", createUser);

router.post("/update", updateUser);

export default router;
