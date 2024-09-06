import { createUser, getuserbyid, getallusers,deleteByid, update} from "./user.services.js";






export const signup =async (req, res) =>{

    const { firstName,lastName, email, password } = req.body;

    const userdetails = await createUser(firstName,lastName, email, password);

    return res.status(200).json({
      "message": "user created",
      userdetails
    })
  }
    




export const userid = async (req, res) =>{

  const {id} = req.params;

  const user = await getuserbyid(id);
  

  return res.status(200).json({
    "message": "user id found",
    user
  }
)}
export const allusers = async (req, res) =>{


  const users = await getallusers();

  return res.status(200).json({
    "message": "user id found",
    users
  }
)}
export const deleteid = async (req,res) =>{
  const {id} = req.params;
  const user = await deleteByid();

  return res.status(200).json({
    "message":"userid deleted",
    user
  }) 
}
export const updateUser= async (req,res) =>{
  const {id} = req.params;
  const user = await update();

  return res.status(200).json({
    "message":"userid deleted ${id} ",
    user
  }) 
}