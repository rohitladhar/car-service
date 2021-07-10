import React, { useState,useEffect,useContext} from 'react'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from '../context/AuthContext'
import { useHistory } from 'react-router-dom';
function Home(props) {
    const{user} = useContext(AuthContext)
    const history = useHistory();
    const startDate = moment().format('YYYY-MM-DD')
    const endDate = moment().add(6, 'days').format('YYYY-MM-DD')
    const [results, setResults] = useState(null)
    const buttonClicked=(date)=>{
        history.push({
            pathname: '/bookservice',
            state: { date:date }
        }); 
    }
   
    useEffect(()=>{
        if (results===null){
            axios.get(`http://127.0.0.1:9000/api/getbooking/${startDate}/${endDate}`)
            .then(response => setResults(response.data.results))   
            .catch(error => console.log(error))    
        }
    })
    

    return (
        <>
        
            <div className="home__container">
                <h1 className="home__header">Book Service with Us</h1>
             
                <div className="home__booking">
                {results && results.map(result => {
                return (
                    <div key={result._id} className="home__booking__single">
                        Booking Date: {result.date.slice(0, 10)==='No Record'?
                        <span className="booking__error">Booking Sheet Is Not Made Yet</span>:
                        result.date.slice(0, 10)}<br />
                        Available Seat: {result.available==='No Record'?
                        <span className="booking__error">No Record</span>
                        :result.available}<br />
                        Booked Seat: {result.booked==='No Record'?
                        <span className="booking__error">No Record</span>
                        :result.booked}<br/>
                        {result.available>result.booked?
                        <div>
                            {user&&user.name.isAdmin===true?
                            '':(<button className="home__button"
                            onClick={()=>buttonClicked(result.date.slice(0, 10))}
                            >  
                            Book</button>)   
                        }
                        </div>:''}
                        
                        
                    </div>
                )
            })}

                </div>            
                </div>
        </>
    )
}

export default Home
