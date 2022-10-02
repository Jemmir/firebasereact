import React, { useState } from 'react'
import AuthProvider from '../components/AuthProvider'
import { Link, useNavigate } from "react-router-dom";
import { existUserName, updateUser } from '../firebase/Firebase';
import style from "./ChooseUserName.module.css"
const ChooseUserName = () => {
    const [currentState, setCurrentState] = useState(0); 
    const [currentUser, setCurrentUser] = useState() 
    const [userName, setUserName] = useState("")
    const [nombre, setNombre] = useState("")
    const navigate = useNavigate()
    const handleUserLoggedIn = (user) =>{
        navigate("/dashboard")
    }
     
    const handleUserNotRegistered = (user) =>{
        setCurrentUser(user)
        console.log(user)
        setCurrentState(3)
    }

    const handleUserNotLoggedIn = (user) =>{
        navigate("/login")
    }

    const handleInputUsername = (e) => {
        if(e.target.name === "usuario"){
            setUserName(e.target.value)
        }
       
        
    }

    const handleContinue = async () => {
        if(userName !== ""){
            const exist = await existUserName(userName)
            
            if(exist){
                setCurrentState(5)
            }else{
                const tmp = currentUser
                
                tmp.username = userName
                
                tmp.processCompleted = true
                
              
                await updateUser(tmp)
                setCurrentState(6)
            }
        
        }}

    

    if(currentState === 3 || currentState === 5){
        return ( 
            <div className={style.chooseUsernameContainer}>
                <h1>Bienvenido {currentUser.displayName}</h1>
                <p>Para terminar el proceso elige un nombre de usuario</p>
                {currentState === 5 ? <p>El nombre de usuario ya existe</p> : null}
                <div>
                    <input name="usuario" className="input" type="text" onChange={handleInputUsername} />
                </div>
                <div>
                    <button  className="btn" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        )
    }

   

    if(currentState === 6){
        return <div className={style.chooseUsernameContainer}>
            <h1>Felicidades ya puedes ir al dashboard a crear tu links</h1>
            <Link className="btn" to="/dashboard">Continuar</Link>
        </div>
    }
  return (
    <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>
    <>Loading...</>
    </AuthProvider>
  )
}

export default ChooseUserName