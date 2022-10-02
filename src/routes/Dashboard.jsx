
import AuthProvider from '../components/AuthProvider'
import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
import { deleteLink, existUserName, getLinks, insertNewLink, updateLink, updateUser } from '../firebase/Firebase';
import DashboardWrapper from '../components/DashboardWrapper';
import Link from '../components/Link';
import {v4 as uuidv4} from "uuid"
import style from "./Dashboard.module.css"
const Dashboard = () => {
  const [currentState, setCurrentState] = useState(0); 
    const [currentUser, setCurrentUser] = useState() 
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [links, setLinks] = useState([])
  const navigate = useNavigate()

  const handleUserLoggedIn = async (user) =>{
    setCurrentUser(user)
    setCurrentState(2)
    let res = await getLinks(user.uid)
    setLinks(res)
}
 
const handleUserNotRegistered = (user) =>{
    navigate("/login")
    
    setCurrentState(3)
}

const handleUserNotLoggedIn = (user) =>{
    navigate("/login")
}

const handleOnSubmit = (e) => {
  e.preventDefault()
  addLink()
}

const addLink = async () => {
  if (title.trim() !== "" && url.trim() !== ""){
    const newLink = {
      id: uuidv4(),
      title,
      url,
      uid: currentUser.uid
    }
    const res = await insertNewLink(newLink)
   
    newLink.docId = res.id
    
    setTitle("")
    setUrl("")
    setLinks([...links, newLink])
  }
}

const handleOnChange = (e) => {
  const value = e.target.value;
  if (e.target.name === "title"){
    setTitle(value)
  }
  if (e.target.name === "url"){
    setUrl(value)
  }
}

const handleDeleteLink = async(docId) => {
  await deleteLink(docId)
  const tmp = links.filter(link => link.docId !== docId)
  setLinks(tmp)
}
 
const handleUpdateLink = async (docId, title, url) => {
    const link = links.find(item => item.docId === docId)
    link.title = title
    link.url = url
    await updateLink(docId, link)
    
}
if (currentState === 0) {
  return <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotLoggedIn={handleUserNotRegistered} onUserNotRegistered={handleUserNotLoggedIn}>
  loading...
</AuthProvider>
}
  return (
    <DashboardWrapper>
      <h1>Dashboard</h1>
      <form className={style.entryContainer} onSubmit={handleOnSubmit}>
        <label htmlFor="title">Title</label>
        <input className="input" type="text" name="title" onChange={handleOnChange} />

        <label htmlFor="url">Url</label>
        <input className="input"  type="text" name="url" onChange={handleOnChange}/>

        <input className="btn"  type="submit" value="Create new link" />

      </form>

      <div className={style.linksContainer}>
        {links.map((item) => (
        <Link 
        key={item.docId}
        docId={item.docId}
        url={item.url}
        title={item.title}
        onDelete={handleDeleteLink}
        onUpdate={handleUpdateLink}/>))}
      </div>
    </DashboardWrapper>
  )
}

export default Dashboard