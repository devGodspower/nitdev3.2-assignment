import express  from'express';
import {config} from "./config/env.js";
import {createUserTables} from "./user/user.model.js";
import { createAccountTable } from './account/account.model.js';
import { userRouter } from './user/user.route.js';
import { AccountRouter } from "./account/account.route.js";
import { transferTable } from './transaction/transfer/transfer.model.js';
import { transferRouter } from './transaction/transfer/transfer.route.js';
import { createwithdrawalTable } from './transaction/withdrawal/withdrawal.model.js';
import { depositTable } from './transaction/deposit/deposit.model.js';
import { depositRouter } from './transaction/deposit/deposit.route.js';
import { withdrawalRouter } from './transaction/withdrawal/withdrawal.Route.js';




const app = express();


app.use(express.json());

app.use('/users', userRouter);
app.use('/accounts', AccountRouter)
app.use('/transfer', transferRouter)
app.use('/deposit',depositRouter)
app.use('/withdrawal',withdrawalRouter)
 

app.listen(config.port,async()=>{
  try{
  await createUserTables();
  await createAccountTable();
  await transferTable();
  await createwithdrawalTable();
  await depositTable();
  
  
  
 
  

  console.log(`server is listening on ${config.port} `)}
  catch {
    console.error('error durning createtion of tables')
  }
});