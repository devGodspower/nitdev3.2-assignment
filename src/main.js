import express  from'express';
import {config} from "./config/env.js";
import {createUserTables} from "./user/user.model.js";
import { createAccountTable } from './acccount/account.model.js';
import { signup,userid,allusers,deleteid,updateUser } from './user/user.controller.js';


;

const app = express();

app.use(express.json());

app.post("/signup", signup);
app.get("/getuser",userid);
app.get("/users",allusers);
app.delete("/deleteuser",deleteid);
app.put("/updateuser",updateUser)




/*const logger = (req,res,next) => {
  const id = parseInt(req.params.id);

  if(id < 1) {
    return res.status(400).json({
      message: 'id must be valid'
    })
  }
  
    next();
  }
  const validateUsername = (req,res,next) => {
    const username = req.body.username;

    const userNameExist = users.find((user) => user.username === username);

    if (userNameExist){
      return res.status(409).json({
        message: "username already exist"});
    }
    next();
  };

 
 

  const validateEmail = (req,res,next)=>{
    const email = req.body.email;
    const userExist = users.find((user)=> user.email === email);
    if(userExist){
      return res.status(409).json({
        message: 'user with this email already exist'
      })
    }
    next();
  };

    const validateUserAge= (req,res,next)=>{
      const age = req.body.Age;
      
      if(typeof age !== 'number' || age < 18){
        return res.status(409).json({
          message : 'Age is must be 18 or older'
        });
      
      }
      next();
    }*/
    //get all users
/*app.get("/get-users",(req,res)=>{
  return res.json({
    message:"this are the the users",
    data:users
  });
});

    // get single user
app.get("/get-users/:id",logger,(req,res)=>{
  const { id } = req.params;
  let user = null
  // initialise user variable to be null

  for (const item of users) {
    // go through all users to find a match by id
    if (item.id ==  req.params.id) {
      user = item;
      break;
    }
  }

if (user == null) {
  return res.status(404).json({
    message:'user data not found',
  });
}


return  res.json({
    message:'this is the user',
    data: user
  });
});*/
  


//  app.post("/signup",validateUsername,validateEmail,validateUserAge,(req,res)=>{
//   console.log(req.body);
//   const { username,email,password,Age } = req.body;
//   const id = users.length + 1;
//   const  newUser = {
//     id,
//     username,
//     email,
//     password,
//     Age
//   };
 
//  users.push(newUser);

//  const stringUsers = JSON.stringify(users);



//  fs.writeFileSync(
//   "C:/Users/GLR/Desktop/Nit-dev-project-3.3/src/users.js",
//   `export let users = ${stringUsers}`
//  );



// return res.status(201).json({
//   message :'user has been created',
//   // data: JSON.parse(stringUsers),
//   data: req.body
// });
//   });
app.listen(config.port,async()=>{
  await createUserTables();
  await createAccountTable();
  
 
  

  console.log(`server is listening on ${config.port} `)
});