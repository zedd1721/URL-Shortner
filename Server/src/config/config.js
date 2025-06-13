export const cookieOption ={
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
    maxAge: 1000 *60 *60 *24 *7, //1 week
}