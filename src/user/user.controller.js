import { createUser, getuserbyid, getallusers,deleteByid, update,getUserByEmail} from "./user.services.js";
import { signupSchema, signinSchema } from "./user.validator.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { sanitize } from "../utils/sanitizeUser.js";
import { generateToken } from "../utils/jwt.js";


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
    

    const [userdetails] = await createUser(firstName,lastName, email, hashedPassword);

    return res.status(200).json({
      "message": "user created",
      data : sanitize(userdetails)
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


export const signin = async (req, res) =>{

  const {error, value} = signinSchema.validate(req.body)

  if (error) return res.status(400).json({
    message: error.details[0].message
  })

  const {email, password} = value;


  const [user] = await getUserByEmail(email)


  if (!user) return res.status(404).json({
    message: "No user with this email!!"
  })

  const isMatch = await comparePassword(password, user.password)

  if(!isMatch) return res.status(403).json({
    message: "Invalid credentials"
  })

  const accessToken = generateToken(sanitize(user))

  return res.status(200).json({
    message: "user loggedin successfully",
    accessToken: accessToken
  })

}
