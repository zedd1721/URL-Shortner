import { createUser, findUserbyEmail } from "../dao/user.dao.js";
import { ConflictError, NotFoundError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";


export const registerUser =  async (name, email, password) => {
  const user = await findUserbyEmail(email);
  if (user) {
    throw new ConflictError("User Already Exists");
  }

  const newUser = await createUser(name, email, password);
  const token = signToken({id: newUser._id})
  return {token,user};
};


export const loginUser =async(email, password)=>{
    
    
    const user = await findUserbyEmail(email);
    
    
    if(!user){
        throw new NotFoundError("User not Found")
    }
    if(user.password !== password) {
        throw new Error("Wrong credentials")
    }
    const token = signToken({id: user._id})
    return {token, user};
}