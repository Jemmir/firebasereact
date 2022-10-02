import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { existUserName, getLinks, getProfilePhoto, getUserInfo, getUserPublicProfileInfo } from '../firebase/Firebase'
import style from "./PublicProfile.module.css"
const PublicProfile = () => {
  const params = useParams()
  const [profileInfo, setProfileInfo] = useState(null)
  const [profileUrl, setProfileUrl] = useState(null)
  const [currentState, setCurrentState] = useState(0)
  const [url, setUrl] = useState("")
  useEffect(() => {
    
    async function pimpam(){
      const username = params.username
    try {
      const userUid = await existUserName(username)
      
      if(userUid){
        const userInfo = await getUserInfo(userUid)
        const userLinks = await getLinks(userUid)
        
        setProfileInfo(userInfo)
        setProfileUrl(userLinks)
       
        const url = await getProfilePhoto(userInfo.profilePicture)
        setUrl(url)
      }else{
        setCurrentState(7)
      }
      
      
    } catch (error) {
      
    }
    }
    pimpam()
  },[params])

  if (currentState === 7) {
    return (
    <div>
      This username doesn't exist
    </div>
    )
  }

  return (
    <div className={style.profileContainer}>
        <div className={style.profilePicture}>
          <img src={url}/>
        </div>

        <h2>{profileInfo?.displayName}</h2>
        <h3>{profileInfo?.username}</h3>
        <div className={style.publicLinksContainer}>
        {
        profileUrl?.map((item) => (<a className={style.publicLinkContainer} key={item.id} href={item.url} >{item.title}</a>))
          }
        </div>
      
     
    </div>
  )
}

export default PublicProfile