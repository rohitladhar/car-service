import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'
function SignIn(props) {
    const {user,login} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors,setErrors]=  useState('')
    
    const isDisabled = email.length===0 || password.length ===0
    const onSubmit = e =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url:'http://localhost:9000/api/signin',
            data: {
                email:email,
                password:password
            },
            headers:{
                "Content-Type":'application/json'
            }
           
        })
        .then(response=> {
            login(response.data.token)
            props.history.push('/')
            window.location.reload()
        })
        
        .catch(err => setErrors(err.response.data.error))    
    }
    
    useEffect(()=>{
        if(user!==null) props.history.push('/')
        
    })
   
    return (
        <>
        <div className="signin__container">
            <h1 className="signin__header">Login</h1>
            
            <form type="submit" className="signinform__container" onSubmit={onSubmit} > 
            <label >Email:
                <input
                    type="email"
                    name="email"
                    placeholder="Email...."
                    value={email}
                    className='signin__input'
                    onChange={e=>setEmail(e.target.value)}
                />
                </label><br/>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        placeholder="Password...."
                        value={password}
                        className='signin__input'
                        onChange={e=>setPassword(e.target.value)}
                />
                </label>
                <br/>
                <Link className="register__link "to="/register">Create An Account?</Link><br/>
                <Link className="register__link "to="/email">Forget Password?</Link><br/>
                <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >Sign In</button><br/>
               <div className="errors"> {errors&& errors.map(error=>{
                   return(
                       <div key={email}>
                            {error.email}<br/>
                            {error.password}
                         </div>
                   )
                   
               })}</div>
            </form>
            
        </div>
        </>
    )
}

export default SignIn
