import React,{useState,useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
function StatusView(props) {
    const {user} = useContext(AuthContext)
    const token = localStorage.getItem('ladhar-admin')
    const [viewStatus,setViewStatus] = useState('')
    const [date, setDate] = useState('')
    const validToken = localStorage.getItem('ladhar-user')
    if(user===null) props.history.push('/signin')
    if(token!==null) props.history.push('/signin')
    const isDisabled = date.length===0 
    const onSubmit = e =>{
        e.preventDefault();
        axios({
            method: 'GET',
            url:`http://localhost:9000/api/statusview/${date}/${user.name.email}`,
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + validToken
            }
           
        })
        .then(response=> {
            setViewStatus(response.data.status)
            setDate('')
        })
        .catch(err => console.log(err))    
    }
    
    return (
        <>
        <div className="signin__container">
            <h1 className="signin__header">View Status</h1>
            <form type="submit" className="statusviewform__container" onSubmit={onSubmit} > 
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
                
                <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >View</button><br/>
               <div className={viewStatus==='Not Found'||viewStatus==='Rejected'?'errors':'saved'}> {viewStatus}</div>
            </form>
            
        </div>
        </>
    )
}

export default StatusView
