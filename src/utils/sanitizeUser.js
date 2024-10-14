

export const sanitize = (user) =>{

  const {created_at, password, ...rest } = user
   return rest

}
export const SanitizedAll = (users)=>{
return users.map((user) =>{
  return sanitize(user)

  /*const santized =[]
  for(let i = 0; i< users.length; i++){
    santized.push(sanitize(users[i]))
  } 
    return sanitized*/
})
}