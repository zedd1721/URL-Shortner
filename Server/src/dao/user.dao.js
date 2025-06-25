import User from "../models/user.model.js"

export const findUserbyEmail = async(email)=>{
    return await User.findOne({email})
}

export const findUserByEmailByPassword = async (email) => {
    return await User.findOne({email}).select('+password')
}

export const findUserbyId = async(id)=>{
    return await User.findById(id)
}

export const createUser = async(name, email, password) => {
    const newUser = new User({name, email, password})
    await newUser.save();
    return newUser;
}