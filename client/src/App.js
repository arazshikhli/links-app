import React from 'react';
import {AuthPage} from './pages/AuthPage'
import {CreatePage} from './pages/CreatePage'
import {LinksPage} from './pages/LinksPage'
import {DetailPage} from './pages/DetailPage'
import {Routes,Route,redirect} from 'react-router-dom'
import { RequireAuth } from './hoc/RequireAuth';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/Auth.context';
import 'materialize-css';

function App() {

  const {login,logout,token,userId}=useAuth();
  const isAuthenticated=!!token
    return (
      <AuthContext.Provider value={{
        token,login,logout,userId,isAuthenticated
      }}>
        <Routes>
      <Route path='/links' element={<LinksPage/>}/>
      <Route path='/create' element={
        <RequireAuth>
          <CreatePage/>
        </RequireAuth>
      } />
      <Route path='/detail/:id' element={ <RequireAuth>
          <DetailPage/>
        </RequireAuth>} />
      <Route path='/auth' element={<AuthPage/>}/>
  </Routes>
      </AuthContext.Provider>
      
    )

}

export default App;
