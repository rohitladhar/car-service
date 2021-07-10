import React,{useContext,useState} from 'react'
import { useLocation } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
function CreateService(props) {
    const{user} = useContext(AuthContext)
    const token = localStorage.getItem('ladhar-admin')
    const validToken = localStorage.getItem('ladhar-user')
    const location = useLocation();
    const [name,setName] = useState('')
    const [engine, setEngine] = useState('')
    const [phone, setPhone] = useState('')
    const [errors,setErrors]=  useState('')
    const [saved,setSaved] = useState('')
    if(user===null) props.history.push('/signin')
    if(token!==null) props.history.push('/signin')
    
    
    const isDisabled = name.length===0 || phone.length ===0 || engine.length ===0
    const onSubmit = e =>{
        e.preventDefault();
        setSaved('')
        setErrors('')
        axios({
            method: 'POST',
            url:'http://localhost:9000/api/createservice',
            data: {
                email:user.name.email,
                date:location.state.date,
                name:name,
                engine:engine,
                phone:phone
            },
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + validToken
            }
           
        })
        .then(response=> {
            setSaved(response.data.success)
        })
        
       .catch(err => setErrors(err.response.data.error))    
    }
    
    return (
        <>
                <div className="bookservice__container">
            <h1 className="bookservice__header">Service Book</h1>
            
            <form type="submit" className="bookserviceform__container" onSubmit={onSubmit}> 
            <label >Name:
                <input
                    type="name"
                    name="name"
                    placeholder="Name...."
                    className='bookservice__input'
                    onChange={(e)=>setName(e.target.value)}
                />
                </label><br/>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone...."
                        className='bookservice__input' 
                        onChange={(e)=>setPhone(e.target.value)}
                />
                </label>
                <br/>
                <label>
                   Engine:
                    <select name="engine"  className="bookservice__select" onChange={(e)=>setEngine(e.target.value)}>
                        <option value="">Select Engine Type</option>
                        <option value="Diseal">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                    </label>
                
                <button className="bookservice__button" 
                    type="submit" 
                    disabled={isDisabled}
                >Book</button><br/>
               <div className={errors?'errors':'saved'}>{saved}{' '} {errors&& errors.map(error=>{
                   return(
                       <div key={user.name.email} >
                            {error.name}<br/>
                            {error.phone}<br/>

                         </div>
                   )         
               })}</div>
            </form>
            </div>
        
        </>
        
    )
}

export default CreateService