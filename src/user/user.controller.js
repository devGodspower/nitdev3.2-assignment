import { createUser, getuserbyid, getallusers,deleteByid, update,getUserByEmail} from "./user.services.js";
import { signupSchema } from "./user.validator.js";
import { hashPassword } from "./utils/bcrypt.js";






export const signup =async (req, res) =>{
  const {error,value} = signupSchema.validate(req.body)

  if(error)return res.status(400).json({
    message : error.details[0].message
  })

    const { firstName,lastName, email, password } = value;
    const hashedPassword = await hashPassword(password)
    console.log(hashedPassword)
    const userExists =  await getUserByEmail(email);

    if (userExists.length > 0) return res.status(409).json({
        message:` User with email ${email} already exists`
    })
    

    const userdetails = await createUser(firstName,lastName, email, hashedPassword);

    return res.status(200).json({
      "message": "user created",
      data : userdetails
    })
  }
    




export const userid = async (req, res) =>{

  const {id} = req.params;

  const user = await getuserbyid(id);
  

  return res.status(200).json({
    "message": `user id found ${id}`,
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
export const deleteid = async (req , res) => {
  const { id } = req.params;

  
      const user = await deleteByid(id);

      return res.status(200).json({
          message: `User deleted successfully ${id}`,
          user
      });
    }
  


export const updateUser= async (req,res) =>{
  const {id} = req.params;
  const user = await update();

  return res.status(200).json({
    "message":"userid deleted ${id} ",
    user
  })
}
