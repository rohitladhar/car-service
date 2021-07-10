import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'
function Register(props) {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [named,setNamed] = useState('')
    const [errors,setErrors]=  useState('')
    const {user,login} = useContext(AuthContext)
    const isDisabled = email.length===0 || password.length ===0 || named.length ===0
    const onSubmit = e =>{
        e.preventDefault();
        axios({
            method: 'POST',
            url:'http://localhost:9000/api/register',
            data: {
                email:email,
                password:password,
                name:named
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
            <h1 className="signin__header">Register </h1>
            
            <form type="submit" onSubmit={onSubmit} className="registerform__container" > 
            <label >Name:
                <input
                    type="name"
                    name="named"
                    placeholder="name...."
                    onChange={e=>setNamed(e.target.value)}
                />
                </label><br/>
                <label >Email:
                <input
                    type="email"
                    name="email"
                    placeholder="email...."
                    onChange={e=>setEmail(e.target.value)}
                />
                </label><br/>
                <label>
                    Password:
                    <input
                    type="password"
                    name="password"
                    placeholder="password...."
                    onChange={e=>setPassword(e.target.value)}
                />
                </label>
                <br/>
                
                <button className="signin__button" 
                    type="submit"
                    disabled={isDisabled}
                >Register</button>
                <div className="errors"> {errors&& errors.map(error=>{
                   return(
                       <div key={email}>
                           {error.email}
                           {error.name}
                           {error.password}
                         </div>
                   )
                   
               })}</div>
            </form>
            
        </div>
        </>
    )
}

export default Register