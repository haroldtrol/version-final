import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../libs/jws.js';
import jwt from 'jsonwebtoken';
import   {token_secret } from '../config.js'; 


export const register = async (req, res) => {

const { nombre, email, contraseña} = req.body;

try {

    const userFound = await User.findOne({email});
    if (userFound) return res.status(400).json(["El correo ya está registrado"]);

const passwordHash = await bcrypt.hash(contraseña, 10,) 
const newUser = new User({nombre, email, contraseña : passwordHash});




const userSaved = await newUser.save()
const token = await createAccessToken ({id: userSaved._id});

res.cookie("token", token,) 
res.json({
    _id: userSaved._id,
    nombre: userSaved.nombre,
    email: userSaved.email,
    contraseña: userSaved.contraseña,
});
} catch (error) {
    console.log("Error al registrar usuario", error);
}

//console.log(newUser);
//console.log( nombre, email, contraseña);

}

export const login = async (req, res) => {
    const { contraseña, email} = req.body;
    
    try {
    const userFound = await User.findOne ({email})
    if (!userFound) return res.status(400).json(["Usuario no registrado"])
    
    
    const isMatch = await bcrypt.compare(contraseña, userFound.contraseña) 
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"])
    
    const token = await createAccessToken ({id: userFound._id});
    
    res.cookie("token", token) 
    res.json({
        _id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        contraseña: userFound.contraseña,
    });
    } catch (error) {
        console.log("Error al registrar usuario", error);
    }
    
    //console.log(newUser);
    //console.log( nombre, email, contraseña);
    
}

export const logout = async (req, res) => {
res.cookie("token", "", {
    expires: new Date(0),
})
return res.sendStatus(200);
}

export const profile =  async (req, res) => {
    const userFound =  await User.findById (req.user.id)
    if (!userFound) return res.status(400).json({message: "Usuario no registrado"})
    
    return res.json({
        _id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        contraseña: userFound.contraseña,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({message: "No hay token"})

        jwt.verify(token, token_secret, async (err, user) => {
            if (err) return res.status(401).json({message: "Token no válido"})

            const userFound = await User.findById(user.id)
            if (!userFound) return res.status(400).json({message: "Usuario no registrado"})

            return res.json({
                _id: userFound._id,
                nombre: userFound.nombre,
                email: userFound.email,
                contraseña: userFound.contraseña,
            })

})
}