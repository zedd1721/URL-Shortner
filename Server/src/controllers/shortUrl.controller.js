import { getorginalUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUserService } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res, next)=>{
    try {
        const {url} = req.body;
        const shortUrl = await createShortUrlWithoutUserService(url);
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