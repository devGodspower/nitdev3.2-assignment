import { Router } from "express";
import { withdrawal } from "./witdrwal.controller.js";
import { verifyUser } from "../../middlewares/verifyuser.js";


export const  withdrawalRouter = Router();
withdrawalRouter.post("/" , verifyUser, withdrawal )