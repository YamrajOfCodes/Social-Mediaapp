import jwt from "jsonwebtoken";
const SECRET_KEY = "iweuiu938";
const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token;
        console.log("token",token);
        
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            });
        }
        const decode = await jwt.verify(token, SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success:false
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;