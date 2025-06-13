import { getorginalUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUserService, createShortUrlWithUserService } from "../services/shortUrl.service.js";


export const createShortUrl = async (req, res, next)=>{
    try {
        const {originalUrl, slug} = req.body;
       let shortUrl;
       
        if(req.user){
            shortUrl = await createShortUrlWithUserService(originalUrl, req.user._id, slug);
        }else{
            shortUrl = await createShortUrlWithoutUserService(originalUrl);
        }
        res.send(process.env.APP_URL + shortUrl)
    } catch (error) {
        next(error)
    }
    
}



export const redirectFromShortUrl = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const url = await getorginalUrl(id)
        if(!url){
            throw new Error("Short URL not found")
        }
        res.redirect(url.full_url);
    } catch (error) {
        next(error)
    }
}