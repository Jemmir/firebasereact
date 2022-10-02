import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../components/AuthProvider'
import DashboardWrapper from '../components/DashboardWrapper'
import { getProfilePhoto, setUserProfilePhoto, updateUser } from '../firebase/Firebase'
import style from "./EditProfile.module.css"
const EditProfile = () => {
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState(0); 
  const [currentUser, setCurrentUser] = useState() 
  const [profileUrl, setProfileUrl] = useState(null)
  const fileRef = useRef(null)
  
  const handleUserLoggedIn = async (user) =>{
    setCurrentUser(user)
    if(user.profilePicture !== ""){
      
       
      
      const url = await getProfilePhoto(user.profilePicture)
      setProfileUrl(url)
  }
    
    setCurrentState(2)
    
}
 
const handleUserNotRegistered = (user) =>{
    navigate("/login")
    
 
}

const handleUserNotLoggedIn = (user) =>{
    navigate("/login")
}

const handleOpenFilePicker = () => {
  if(fileRef.current){
    fileRef.current.click()
  }
}
const handleChangeFile = (e) => {
  const files = e.target.files
  const fileReader = new FileReader()
  if(fileReader && files.length > 0){
    fileReader.readAsArrayBuffer(files[0])
    fileReader.onload = async function(){
      const imageData = fileReader.result
      const res = await setUserProfilePhoto(currentUser.uid, imageData)
      
      if(res){
        const tmpUser = currentUser
        tmpUser.profilePicture = res.metadata.fullPath
        await updateUser(tmpUser)
        setCurrentUser(tmpUser)
        const url = await getProfilePhoto(currentUser.profilePicture)
        setProfileUrl(url)
      }
    }
  }
}
if(currentState !== 2){
  return <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotLoggedIn} onUserNotRegistered={handleUserNotRegistered}></AuthProvider>

}
  return (
    
    <DashboardWrapper>
      <h2>Edit Profile Info</h2>
      <div className={style.profilePictureContainer}>
        <div>
          <img src={profileUrl} alt="" width={100} />
        </div>
        <div>
          <button className="btn" onClick={handleOpenFilePicker}>Choose new profile picture</button>
          <input className={style.fileInput} ref={fileRef} type="file" onChange={handleChangeFile} />
        </div>
      </div>
    </DashboardWrapper>
    
  )
}


export default EditProfile