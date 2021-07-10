import React from 'react'
import Customer from './customer'
import SignIn from './signin'
import {Route} from 'react-router-dom'
    
function CheckAuth(date,user){
    
    if(user.name.isAdmin===false) window.location.href('/customer')
    if(user.name.isAdmin===null) window.location.href('/signin')
    
       
        
        return(
            <div>
                {user.name.isAdmin===false?
                (
                    <Route exact path='/customer' component={Customer} />
                )    :
                (
                    <Route exact path='/signin' component={SignIn} />
                )
            }
            </div>
        )
    
}
    


export {CheckAuth}