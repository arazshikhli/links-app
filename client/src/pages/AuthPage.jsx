import { useState,useEffect, useContext } from "react";
import React from "react";
import { useLocation,useNavigate, } from "react-router-dom";
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from "../context/Auth.context";
export const AuthPage=()=>{
  const auth=useContext(AuthContext)
  const message=useMessage()
    const {loading,error,request,clearError}=useHttp()
    const navigate=useNavigate()
    const location=useLocation()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    useEffect(()=>{
     
      message(error);
      clearError()
  
    },[error,message,clearError])


    const registerHandler=async()=>{
        try {
            
            const data=await request ('/api/auth/register','POST',{email,password})
            message(data.message)
          if(data.token){
            console.log("Data token: ",data.token)
       
          }
        
        } catch (error) {
            
        }
    }

    const loginHandler=async()=>{
      try {
          
          const data=await request ('/api/auth/login','POST',{email,password})
          console.log('Data',data)
          auth.login(data.token,data.userId)
           if(data.token){
            navigate('/create')
           } 
           else {
            console.log('no data')
          }
       
      } catch (error) {
          
      }
  }
  
    const fromPage=location.state?.from?.pathname||'/'
    return (
        <div className="row">
       <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>
          <div className="input-field ">
          <label htmlFor="email">First Name</label>
          <input 
          placeholder="Введите email" 
          id="email" 
          type="email" 
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="yellow-input validate"/>
         
        </div>
        <div className="input-field ">
          <input 
          placeholder="Введите пароль" 
          id="password" type="password" 
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="yellow-input"/>
          <label htmlFor="password">Password</label>
        </div>
          </div>
      </div>
        <div className="card-action">
        <button 
        className="btn yellow darken-4"
    
        style={{marginRight:10}}
        disabled={loading}
        onClick={loginHandler}
        >Войти</button>
        <button className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}
        >
            Регистрация
            </button>
        </div>
      </div>
       </div>
        </div>
    )
}