import { createUser, findUserbyEmail, findUserByEmailByPassword } from "../dao/user.dao.js";
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
    
    const user = await findUserByEmailByPassword(email);
    
    if(!user){
        throw new NotFoundError("User not Found")
    }
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token, user};
}