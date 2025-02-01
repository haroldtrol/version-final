import   {useForm} from 'react-hook-form';
import {useAuth} from '../context/AuthContext.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/task');
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
        console.log(isAuthenticated);
     });

return (
<div className=' flex flex-col items-center justify-center h-screen bg-zinc-900'>

<div className= 'bg-zinc-800 p-8 rounded-lg shadow-2xl' >

{
    registerErrors.map((error, i) => (
    <div  className=" bg-red-500 p-2 text-white " key={i}>
        {error}
    </div>
    ))
}
    <form onSubmit = {onSubmit}>
    <input type="text" 
    {...register("nombre", { required: true} )}
        className=' w-full  bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='Username'
    />
    {
        errors.nombre && ( <p className='text-red-500'>This field is required</p>)
    }
    <input type="email" 
    {...register("email", { required: true} )}
        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='Email'
        />
    {
        errors.email && ( <p className='text-red-500'>This field is required</p>)
    }

    <input type="password"
    {...register("contraseña", { required: true} )}
        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='Password'
    />
    {
        errors.contraseña && ( <p className='text-red-500'>This field is required</p>)
    }
    <button type="submit">Register</button>
    </form>

</div>
</div>
    )
}

export default RegisterPage;