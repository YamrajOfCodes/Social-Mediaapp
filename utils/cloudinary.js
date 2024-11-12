import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: "dev5lnuz3",
    api_key: "586444889321952",
    api_secret: "jOO8SOdxJlAYeuNwtx_ZazGca94"
});
export default cloudinary;