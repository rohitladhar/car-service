import React,{useEffect,useState} from 'react'
import axios from 'axios'
//import jwtDecode from 'jwt-decode';
function ForgetPassword({match}) {
    //const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [viewStatus,setViewStatus] = useState('')
    //const [name,setName] = useState('')
    const[tokenSet,setTokenSet] = useState('')
    //const[isAdmin,setIsAdmin] = useState('')
    useEffect(() => {
        let token = match.params.token
        //const tokenDecoded = jwtDecode(token)
        if(token) {
           setTokenSet(token)
        }
        
    }, [match.params.token])
    
   
    const isDisabled = password.length===0 
    const onSubmit = e =>{
        e.preventDefault();
        axios({
            method: 'PATCH',
            url:`http://localhost:9000/api/forget/${tokenSet}`,
            data: {
                password:password
            },
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' +tokenSet
                
            }
           
        })
        .then(response=> {
            setViewStatus(response.data.result)
            setPassword('')
        })
        .catch(err => console.log(err))    
    }
    
    return (
        <>
        <div className="signin__container">
            <h1 className="signin__header">Forget Password</h1>
            <form type="submit" className="statusviewform__container" onSubmit={onSubmit} > 
            <label >Password:
                <input
                    type="password"
                    name="password"
                    placeholder="Password...."
                    className='signin__input'
                    onChange={e=>setPassword(e.target.value)}
                />
                </label>
                <br/>
                
                <button className="signin__button" 
                    type="submit" 
                    disabled={isDisabled}
                >View</button><br/>
               
               <div className={viewStatus!==null&&viewStatus==='Password Updated'?'saved':'errors'}> {viewStatus}</div>
            </form>
            
        </div>
        </>
    )
}


export default ForgetPassword
