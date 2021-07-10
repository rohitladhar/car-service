import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
function Header() {
  const {user,logout} = useContext(AuthContext)
  
    return (
        <>
            <div className="header">
        <Link to="/">
          <img className="header__logo" src='logo.png' alt="SkillHub" />
        </Link>
        <ul className="header__ul">
          <li className="header__li">
            
            {user&&user.name.name?
            <div>
              <button className="header__li__button" onClick={e=>{
                            logout(user.name.isAdmin)}}>Logout</button> 
                  
            </div>
            
            :<Link className="header__li__link" to='/SignIn'>
            SignIn
          </Link>
          }
            
          </li>
          
          <li  className="header__li">
            {user&&user.name.isAdmin===true?
            <Link className="header__li__link" to='/createbooking'>
            Booking
          </Link>
            :''}
          </li>
          <li  className="header__li">
            {user&&user.name.isAdmin===true?
            <Link className="header__li__link" to='/getstatus'>
           Status
          </Link>
            :''}
          </li>
          <li  className="header__li">
            {user&&user.name.isAdmin===false?
            <Link className="header__li__link" to='/statusview'>
            View
          </Link>
            :''}
          </li>
          <li className="header__li">
            {user&&user.name.name}
          </li>
        </ul>
      </div>
        </>
        
    )
}

export default Header