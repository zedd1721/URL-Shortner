import { verifyToken } from "./helper.js";
import { findUserbyId } from "../dao/user.dao.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) return next();

  try {
    const decoded = verifyToken(token);
  
    
    const user = await findUserbyId(decoded.id);  
    
    if (!user) return next();

    req.user = user;
    next();
  } catch (error) {
    next(); // silently skip attaching user
  }
};
