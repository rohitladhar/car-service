import React,{useState,useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
function EmailProvider(props) {
    const {user} = useContext(AuthContext)
    const [viewStatus,setViewStatus] = useState('')
    const [errors,setErrors] = useState('')
    const [email, setEmail] = useState('')
    if(user!==null) props.history.push('/signin')
    
    const isDisabled = email.length===0 
    const onSubmit = e =>{
        e.preventDefault();
        axios({
            method: 'GET',
            url:`http://localhost:9000/api/checkemail/${email}`,
            headers:{
                "Content-Type":'application/json',
            }
           
        })
        .then(response=> {
            setViewStatus(response.data.message)
            setEmail('')
        })
        .catch(err => setErrors(err.response.data.error))    
    }
    
    return (
        <>
        <div className="signin__container">
            <h1 className="signin__header">View Status</h1>
            <form type="submit" className="statusviewform__container" onSubmit={onSubmit} > 
            <label >Email:
                <input
                    type="email"
                    name="Email"
                    placeholder="Email...."
                    className='signin__input'
                    onChange={e=>setEmail(e.target.value)}
                />
                </label>
                <br/>
                
                <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >View</button><br/>
               <div className={errors!==null?'errors':'saved'}> {errors}</div>
               <div className={viewStatus!==null?'saved':'errors'}> {viewStatus}</div>
            </form>
            
        </div>
        </>
    )
}

export default EmailProvider
