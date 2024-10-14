import { transfer } from "./transfer.controller.js";
import { Router } from "express";
import { verifyUser } from "../../middlewares/verifyuser.js";


export const transferRouter = Router()

transferRouter.post('/',  verifyUser, transfer)