import React,{useState} from 'react'
import axios from 'axios'
function UpdateStatus({results,prevResults}) {
    const yes = 'Approved'
    const no = 'Rejected'
    const [resultUpdate,setResultUpdate] = useState('')
    
    const validToken = localStorage.getItem('ladhar-admin')
    const statusUpdate = (abc,id,date) =>{
        axios({
            method: 'PATCH',
            url:`http://localhost:9000/api/servicestatus/${id}`,
            data: {
                status:abc
            },
            headers:{
                "Content-Type":'application/json',
                'Authorization': 'Bearer ' + validToken
            }
           
        })
        .then(()=>{
            axios({
                method: 'GET',
                url:`http://localhost:9000/api/getservice/${date}`,
                
                headers:{
                    "Content-Type":'application/json',
                    'Authorization': 'Bearer ' + validToken
                }
               
            })
            .then(response=> {
                setResultUpdate(response.data.results)
               
            })
        }
)
        .catch(err => console.log(err.response.data.result))    
    }
    return (
        <div>
            {results?<div>
            <table className="table__container">
                 <thead>
                <tr>
                    <th style={{textAlign:'center'}}>Ladhar Car Service</th>
                    
                </tr>
                </thead>
                
                <tbody>
                    {resultUpdate?<div>
                        {resultUpdate&& resultUpdate.map(result=>{
                   return(
                    <tr key={result._id}>
                    <td>{result.name}</td>
                    <td>{result.phone}</td>
                    <td>{result.status}</td>
                   
                    <td><button className='yes' onClick={e=>statusUpdate(yes,result._id,result.date)}>Y</button> </td>
                    <td><button className='no' onClick={e=>statusUpdate(no,result._id,result.date)}>N</button></td>   
                </tr> 
                            )         
                    })}
                    </div>:<div>
                    {results&&results!==prevResults&& results.map(result=>{
                    return(
                        <tr key={result._id}>
                        <td>{result.name}</td>
                        <td>{result.phone}</td>
                        <td>{result.status}</td>
                        <td><button className='yes' onClick={e=>statusUpdate(yes,result._id,result.date)}>Y</button> </td>
                        <td><button className='no' onClick={e=>statusUpdate(no,result._id,result.date)}>N</button></td>
                        </tr> 
                                )         
                        })}
                        </div>}
               
                   
                </tbody>
            </table>
           
        </div>
        :''}
        </div>
    )
}

export default UpdateStatus
