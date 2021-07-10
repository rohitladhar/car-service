import React,{useContext,useState,useRef,useEffect} from 'react'
import UpdateStatus from './updatestatus'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
const GetStatus=(props)=> {
    const{user} = useContext(AuthContext)
    const [results,setResults] = useState('')
    const prevResults = usePrevious(results)
    const [errors,setErrors] = useState('')
    const [date,setDate] = useState('')
    const isDisabled = date.length===0 
    const validToken = localStorage.getItem('ladhar-admin')
    const token = localStorage.getItem('ladhar-user')
    if(user===null) props.history.push('/signin')
    if(token!==null) props.history.push('/signin')
    
    const onSubmit = e =>{
        e.preventDefault();
        setErrors('')
        setResults('')
        
        axios({
            method: 'GET',
            url:`http://localhost:9000/api/getservice/${date}`,
            
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + validToken
            }
           
        })
        .then(response=> {
            setResults(response.data.results)
            setDate('') 
        })
        
       .catch(err => 
        setErrors(err.response.data.errors))  
        setDate('')  
    }
    return (
        <>
        <div className="getstatus__container">
            
            <div className="getstatus__container__left">
                <h1 className="getstatus__container__header"> 
                    Get Services
                </h1>
                <form type="submit" className="getstatus__container__left__container" onSubmit={onSubmit}  > 
            <label >Date:
                <input
                    type="date"
                    name="date"
                    placeholder="Date...."
                    className='signin__input'
                    onChange={e=>setDate(e.target.value)&&setResults('')}
                />
                </label>
                <br/>
                
                <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >View</button><br/>
              
            </form>
            </div>
            <div className="getstatus__container__right">
                <h1 className="getstatus__container__header"> 
                    Status Update
                </h1>
                {errors?<div className="getstatus__error">
                {errors}
                </div>:<UpdateStatus results={results} prevResults={prevResults}  />}
            </div>
        </div>
        </>
    )
}

export default GetStatus

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }