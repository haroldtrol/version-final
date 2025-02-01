import {z} from 'zod';
export const registerSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre es requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email no valido'
    }),
    contraseña: z.string({
        required_error: 'Password es requerido'
    }).min(6, 
        { message: 'Password debe tener al menos 6 caracteres'}
    )
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Email no valido'
    }),
    contraseña: z.string({
        required_error: 'Password es requerido'
    }).min(6, 
        { message: 'Password debe tener al menos 6 caracteres'}
    )
});
