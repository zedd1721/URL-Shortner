import { cookieOption } from "../config/config.js";
import {registerUser, loginUser} from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js"

export const  register = wrapAsync(async(req, res)=>{
    const{name, email, password} = req.body;
    const {token, user} = await registerUser(name, email, password);
    req.user = user
    res.cookie("accessToken", token, cookieOption)
    res.status(200).json({message: "Registered Successfully"});
})

export const login = wrapAsync(async(req, res)=>{
    const {email, password} = req.body;
    const {token, user} = await loginUser(email, password);
    req.user = user
    res.cookie("accessToken", token, cookieOption)
    res.status(200).json({message: "Login Success"})
});