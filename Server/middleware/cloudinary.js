import cloudinary from "cloudinary";
import dotenv from "dotenv";
import url from "url";

function cloudinar(req,res,next){
    dotenv.config();
const cloudinary_url = url.parse(process.env.CLOUDINARY_URL);
cloudinary.config({
    cloud_name: cloudinary_url.host,
    api_key: cloudinary_url.auth.split(':')[0],
    api_secret: cloudinary_url.auth.split(':')[1],
});
cloudinary.v2.uploader.upload(req.body.image, (error, result) => {
    if (result) {
        req.body.image = result.secure_url;
    }
return next();
});

}
export default cloudinar;