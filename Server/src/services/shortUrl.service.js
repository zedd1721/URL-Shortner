import { generateNanoId } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUserService =async(url)=>{
    const shortUrl = generateNanoId(7)
    if(!shortUrl){
        throw new Error("Short Url is not generated!!")
    }
    
    await saveShortUrl(shortUrl, url);
    
    return shortUrl;
}

export const createShortUrlWithUserService =async(url)=>{
    const shortUrl = generateNanoId(7)
    await saveShortUrl(shortUrl, url, userId);
    
    return shortUrl;
}