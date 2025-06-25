export const cookieOption ={
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite:"None",
    maxAge: 1000 *60 *60 *24 *7, //1 week
}