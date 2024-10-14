import { Router } from "express";
import { signup,signin,deleteid,allusers,userid } from "./user.controller.js";
import { verifyUser} from "../middlewares/verifyuser.js";

export const userRouter = Router()

userRouter.post('/signin',signin)
userRouter.post("/signup",signup)
userRouter.get("/allusers",verifyUser , allusers)
userRouter.get("/getuser/:id",userid)
userRouter.delete("/deleteuser/:id",deleteid)