import jwt from 'jsonwebtoken';
import { token_secret } from '../config.js';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if (!token) 
        return res.status(401).json({message: "No estas autorizado"})
    jwt.verify
    (
        token,
        token_secret,
        (err, user)  => {
            if (err) return res.status(401).json({message: "No estas autorizado"});
            console.log(user);
            req.user = user;
            next();
        }
    )
}