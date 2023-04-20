import {useLocation,Navigate} from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook';

const RequireAuth=({children})=>{
    const {login,logout,token,userId}=useAuth();
    console.log(token)
    let isAuthenticated=false;
    if (token){
        isAuthenticated=true
    }
    else{
        console.log('no token')
    }
    console.log(isAuthenticated)
    const location=useLocation();

    if(!isAuthenticated){
        return <Navigate to='/auth' state={{from:location}}/>
    }
    return children;    
}

export {RequireAuth}