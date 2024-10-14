import { createUser, getuserbyid, getallusers,deleteByid, update,getUserByEmail,getUserByPhoneNumber} from "./user.service.js";
import { signupSchema, signinSchema } from "./user.validator.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { sanitize, SanitizedAll } from "../utils/sanitizeUser.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { firstName, lastName, email, password, phonenumber } = value;

    
    const hashedPassword = await hashPassword(password);

    
    const userExists = await getUserByEmail(email);
    const userNumExists = await getUserByPhoneNumber(phonenumber);

    if (userExists.length > 0 || userNumExists.length > 0) {
      return res.status(409).json({
        message: "User with email or phone number already exists",
      });
    }

  
    const [userdetails] = await createUser(firstName, lastName, email, hashedPassword, phonenumber);

    
    return res.status(200).json({
      message: "User created successfully",
      data: sanitize(userdetails),
    });

  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      message: "Internal server error during signup",
      error: error.message,
    });
  }
};

    




export const userid = async (req,res) =>{
  try{
  
    const {userId} = req.params
    const [user] = await getuserbyid(userId);
    if(!user){
      return res.status(404).json ({
        message : 'user not found',
 });
    }
    return res.status(200).json({
      message : 'user id found',
      user : sanitize(user)
    })
  }catch (error){
    console.log ('error fetching user with id',error);
    return res.status(500).json({
      message : 'internal server error ',
      error : error.message
    })
  }
}
export const allusers = async (req, res) => {
  try {
    const allusers = await getallusers();

  
    
      return res.status(200).json({
        message: `there are ${allusers.length} users`,
        data :  allusers.map(user => SanitizedAll(user))

      })

    


  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({
      message: "Internal server error fetching all users",
      error: error.message,
    });
  }
};


export const deleteid = async (req, res) => {
  const { id } = req.params;

  try {
  
    const user = await deleteByid(id);

    
    return res.status(200).json({
      message: `User deleted successfully: ${id}`,
      user
    });
  } catch (error) {
    
    console.error(`Error deleting user with ID: ${id}`, error);
    
    return res.status(500).json({
      message: "Failed to delete the user. Please try again.",
      error: error.message
    });
  }
};



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
