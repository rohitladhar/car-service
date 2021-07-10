import React,{useReducer,createContext} from 'react'
import jwtDecode from 'jwt-decode';

const initialState={
  user:null,
  
  isMaster:true
}



if (localStorage.getItem('ladhar-user')) {
  const decodedToken = jwtDecode(localStorage.getItem('ladhar-user'));

  if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('ladhar-user');
  } else {
      initialState.user = decodedToken;
  }
}
else if(localStorage.getItem('ladhar-admin')){
  const decodedToken = jwtDecode(localStorage.getItem('ladhar-admin'));

  if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('ladhar-admin');
  } else {
      initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  initialState,
  login: (token) => { },
  logout: () => { }
});

function authReducer(state,action){
  
  switch (action.type){
    case 'LOGIN':
      return{
        ...state,
        name:action.payload
      }
      case 'LOGOUT':
        return{
          ...state,
          name:null
        }
        default:
          return state
  }
}

function AuthProvider(props){
  const [state,dispatch] = useReducer(authReducer,initialState)
  const  login = async(token)=>{
    const tokenDecoded =  await jwtDecode(token)
      
    if(tokenDecoded.name.isAdmin===true){
        
        localStorage.setItem('ladhar-admin',token)
        
        dispatch({
          type: 'LOGIN',
          payload: tokenDecoded
      });
    }
    else if(tokenDecoded.name.isAdmin===false){
        
        localStorage.setItem('ladhar-user',token)
        
        dispatch({
          type: 'LOGIN',
          payload: tokenDecoded
      });
    }
    
  }

  function logout(isAdmin) {
    if(isAdmin===true){
      localStorage.removeItem('ladhar-admin');
      dispatch({ type: 'LOGOUT' });
      window.location.reload()
    }
    else if(isAdmin===false){
      localStorage.removeItem('ladhar-user');
      dispatch({ type: 'LOGOUT' });
      window.location.reload()
    }
    
}



return(
  <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
)
}

export { AuthContext, AuthProvider };