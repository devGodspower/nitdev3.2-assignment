import { Router } from "express";
import { createAccounts } from "./account.controller.js";
import { verifyUser } from "../middlewares/verifyuser.js";


export const AccountRouter = Router()
AccountRouter.post('/create', verifyUser, createAccounts);
