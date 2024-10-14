import { config } from "../config/env.js"
import jwt from "jsonwebtoken"

export const verifyUser = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).json({
        'message': "Authorization header missing!"
    })

    const token = authHeader.split(' ')[1]

    if (!token) return res.status(401).json({
        "message": "Token where are you!!"
    })

    jwt.verify(token, config.auth.accessTokenSecretKey, (err, decoded) =>{
        if (err) return res.status(403).json({
            "message": "Invalid token or token expired!!"
        })
        req.user = decoded.user
        next();
    })

}