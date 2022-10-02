import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { auth, registerNewUser, userExists, getUserInfo } from "../firebase/Firebase"


const AuthProvider = ({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}) => {
    const navigate = useNavigate()
    useEffect(() =>{
        onAuthStateChanged(auth, async (user) => {
            if (user) {
               
                const isRegistered = await userExists(user.uid)
                if(isRegistered){
                    const userInfo = await getUserInfo(user.uid)
                    
                    if(userInfo.processCompleted){
                        await onUserLoggedIn(userInfo)
                    }else{  
                        await onUserNotRegistered(userInfo)
                    } 
                   
                }else if(user.confirmed === false){
                    await registerNewUser({
                        uid: user.uid,
                        displayName: user.displayName,
                        profilePicture: "",
                        username: "",
                        processCompleted: false,
                        confirmed: false
                    })
                    onUserNotRegistered(user)
                }else{await registerNewUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    profilePicture: "",
                    username: "",
                    processCompleted: false,
                    
                })
                onUserNotRegistered(user)

                }
               
            }else{ 
                onUserNotLoggedIn()
            }
        }

         )
        
       
           

      
    },[navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]) 
  return (
    <div>{children}</div>
  )
}

export default AuthProvider