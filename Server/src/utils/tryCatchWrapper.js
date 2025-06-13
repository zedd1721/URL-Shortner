export default function wrapAsync(fn){
    return function(req, res, next){
        //calls the async function and catch any errors
        fn(req, res, next).catch(next); //passes the Error to error handler
    }
}