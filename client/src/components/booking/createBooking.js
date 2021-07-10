import React,{useState,useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
function CreateBooking(props) {
    const {user} = useContext(AuthContext)
    const  validToken = localStorage.getItem('ladhar-admin')
    const [errors,setErrors] = useState('')
    const [date, setDate] = useState('')
    const [available, setAvailable] = useState('')
    const [viewStatus,setViewStatus] = useState('')
    const token = localStorage.getItem('ladhar-user')
    if(user===null) props.history.push('/signin')
    if(token!==null) props.history.push('/signin')
    const isDisabled = date.length===0 || available.length ===0
    const onSubmit = e =>{
        e.preventDefault();
        setViewStatus('')
        setErrors('')
        axios({
            method: 'POST',
            url:'http://localhost:9000/api/createbooking',
            data: {
                available:available,
                date:date,
            },
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + validToken
            }
           
        })
        .then(response=> {
            setViewStatus(response.data.results)
            setDate('')
        })
        .catch(err => setErrors(err.response.data.errors))    
    }
    
    return (
        <>
        <div className="signin__container">
            <h1 className="signin__header">Add Booking</h1>
            <form type="submit" className="addbookingform__container" onSubmit={onSubmit} > 
            <label >Date:
                <input
                    type="date"
                    name="date"
                    placeholder="Date...."
                    className='signin__input'
                    onChange={e=>setDate(e.target.value)}
                />
                </label>
                <br/>
                <label >Available Seats:
                <input
                    type="text"
                    name="available"
                    placeholder="Available Seats...."
                    className='signin__input'
                    onChange={e=>setAvailable(e.target.value)}
                />
                </label>
                <br/> 
              <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >Add</button><br/>
                {viewStatus?<div className="saved">
                    {viewStatus}
                </div>:''}
                {errors?<div className='errors'>
                    {errors&& errors.map(error=>{
                   return(
                       <div key={user.name.email} >
                            {error.available}<br/>
                         </div>
                            )         
                    })}
                </div>:''}
            
            </form>
            
        </div>
        </>
    )
}

export default CreateBooking
