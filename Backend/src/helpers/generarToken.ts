import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

type UserPayload = {
    id: number,
    admin: number
}

const generarJWT = (payload : UserPayload) : string => {
    console.log(process.env.JWT_SECRET)
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3d" 
    });
}

export default generarJWT;