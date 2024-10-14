import { deposit } from "./deposit.controller.js";
import { verifyUser } from "../../middlewares/verifyuser.js";
import { Router } from "express";

export const depositRouter = Router()
depositRouter.post('/', verifyUser, deposit)
