import React from 'react';
import{Route,Redirect} from 'react-router-dom';

function ProtectiveCustomer({component:Component,...rest}){
    const token = localStorage.getItem('ladhar-user')
    return <Route{...rest} render={()=>{
        if(token)
        {
            return <Component/>
        }
        else{
            return <Redirect to='/'/> 
        }

    }}/>;
}

export default ProtectiveCustomer;