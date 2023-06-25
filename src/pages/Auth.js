import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
const initialState = {
    firstName: '',
    LastName:'',
    email: '',
    password: '',
    confirmPassword:''

}
const Auth = ({setActive,setUser}) => {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);
    const navigate=useNavigate()
    const { email, password,firstName,LastName,confirmPassword } = state;
    const handleChange = (e) => {
       setState({...state,[e.target.name]:e.target.value})
    }
    const handleAuth=async(e)=>{
        e.preventDefault();
       try{
        if(!signUp){
            if(email&&password){
                const {user}=await signInWithEmailAndPassword(auth,email,password)
                setUser(user)
                setActive('home')
            }else{
                return toast.error('todos los campos son obligatorios de llenar')
            }
            
        }else{
           if(password!==confirmPassword){
            
             return toast.error('la contraseña no coincide')
           }
           if(password<''){
            return toast.error('la contraseña debe ser más larga')
           }
           if (firstName && LastName && email && password) {
            const { user } = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            await updateProfile(user, { displayName: `${firstName} ${LastName}` });
            setActive("home");
          } else {
            return toast.error("todos los campos son obligatorios de llenar");
          }
        }}catch{
            return toast.error("verifica tus datos");
        }
        navigate('/')            //todos los campos son obligatorios de llenar

    }
    return (
        <div className='container-fluid mb-4'>
            <div className='container'>
                <div className='col-12 text-center'>
                    <div className='text-center heading py-2'>
                        {!signUp ? 'Iniciar Sesión' : 'Registrarse'}

                    </div>
                    <div className='row h-100 justify-content-center align-items-center'>
                        <div className='col-10 col-md-8 col-lg-6'>
                            <form className='row' onSubmit={handleAuth}>
                            {signUp&&(
                                <>
                                <div className='col-6 py-3'>
                                <input onChange={handleChange} value={firstName} type='text' className='form-control input-text-box' placeholder='Nombre' name='firstName' />
                            </div>
                            <div className='col-6 py-3'>
                                <input onChange={handleChange} value={LastName} type='text' className='form-control input-text-box' placeholder='Apellido' name='LastName' />
                            </div>
                            </>
                            )}
                                <div className='col-12 py-3'>
                                    <input onChange={handleChange} value={email} type='email' className='form-control input-text-box' placeholder='Email' name='email' />
                                </div>
                              
                                <div className='col-12 py-3'>
                                    <input onChange={handleChange} value={password} type='password' className='form-control input-text-box' placeholder='Contraseña' name='password' />
                                </div>

                                {signUp &&(
                                    <> <div className='col-12 py-3'>
                                    <input onChange={handleChange} value={confirmPassword} type='password' className='form-control input-text-box' placeholder='Confirmar Contraseña' name='confirmPassword' />
                                </div></>
                                )}
                                <div className='col-12 py-3 text-center'>
                                    <button className={`btn ${!signUp ? 'btn-sign-in' : 'btn-sign-up'}`} type='submit'>
                                        {!signUp ? 'Sign-in' : 'Sign-up'}</button>

                                </div>

                            </form>
                            <div>
                                {!signUp ? (

                                    <>
                                        <div className='text-center justify-content-center nt-2 pt-2'>
                                          <p className='small mt-2 mt-1 mb-0 fw-bold'>¿No tiene una cuenta? 
                                          
                                          <span onClick={()=>setSignUp(true)} className='link-danger'style={{textDecoration:'none',cursor:'pointer'}}>
                                            Registrate
                                          </span>
                                          
                                          </p>
                                        </div>
                                    </>

                                ):(

                                    <>
                                    <div className='text-center justify-content-center nt-2 pt-2'>
                                    <p className='small mt-2 mt-1 mb-0 fw-bold'> ¿tienes una cuenta?
                                    
                                    <span  onClick={()=>setSignUp(false)} style={{textDecoration:'none',cursor:'pointer',color:'#298af2'}}>
                                      Iniciar Sesión
                                    </span>
                                    
                                    </p>
                                  </div>
                                    </>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
