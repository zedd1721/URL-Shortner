import { findUserbyId } from "../dao/user.dao.js";
import { UnauthorizedError } from "../utils/errorHandler.js";
import { verifyToken } from "../utils/helper.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const authMiddleware = wrapAsync(async(req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        throw new UnauthorizedError("Unauthorized")
    }
    const decoded = verifyToken(token);
    const user = await findUserbyId(decoded.id);
    if(!user){
        throw new UnauthorizedError("Unauthorized")
    }
    req.user = user;
    next()

})