import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUserService =async(url)=>{
    const shortUrl = generateNanoId(7)
    if(!shortUrl){
        throw new Error("Short Url is not generated!!")
    }
    
    await saveShortUrl(shortUrl, url);
    
    return shortUrl;
}

export const createShortUrlWithUserService =async(url,userId, slug=null)=>{
    

    const shortUrl = slug || generateNanoId(7)
    
    const exist = await getCustomShortUrl(slug)
    if(exist) throw new Error("Short Url Already Exists")
    await saveShortUrl(shortUrl, url, userId);
    
    return shortUrl;
}