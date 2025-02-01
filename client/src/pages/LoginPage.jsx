import{ useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {Link} from 'react-router-dom';


function LoginPage() {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const {signin, errors: signinErrors} = useAuth();
const  onSubmit =  handleSubmit ((data) => {
 signin(data);
});

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-zinc-900'>      
        
        <div className='  bg-zinc-800 p-8 rounded-lg shadow-2xl'>
        {
    signinErrors.map((error, i) => (
    <div  className=" bg-red-500 p-2 text-white " key={i}>
        {error}
    </div>
    ))
}


        <h1 className='text-3xl text-white font-bold mb-4'>Login</h1>

        <form onSubmit = {onSubmit}>
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
    <button type="submit">Login</button>
    </form>

    <p> 
        Don&apos;t have an account? <Link to = '/register' className='text-blue-500'>Register</Link>
    </p>
        </div>
        </div>
    
        )
    }
    export default LoginPage;