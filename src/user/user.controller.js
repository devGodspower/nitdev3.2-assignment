import { createUser } from "./user.services.js";



export const signup =async (req, res) =>{

    const { username, email, password } = req.body;

    const user = await createUser(username, email, password);

    return res.status(201).json({
      "message": "user created",
      user
    })



}