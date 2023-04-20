import React from "react";
import {Routes,Route}from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

// export const useRoutes = isAuthenticated => {
//     if (isAuthenticated) {
//       return (
//         <Routes>
//             <Route path="/links" element/>
//         </Routes>
//       )
//     }
  
//     return (
//       <Routes>
//         <Route path="/" exact>
//           <AuthPage />
//         </Route>
//         <Redirect to="/" />
//       </Routes>
//     )
//   }