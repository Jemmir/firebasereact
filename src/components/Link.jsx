import React, { useEffect, useRef, useState } from 'react'
import style from "./Link.module.css"
const Link = ({docId, title, url, onDelete, onUpdate}) => {
    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentUrl, setCurrentUrl] = useState(url)

    const [editTitle, setEditTitle] = useState(false)
    const [editUrl, setEditUrl] = useState(false)

    const titleRef = useRef(null)
    const urlRef = useRef(null)

    useEffect(() => {
        if(titleRef.current){
        titleRef.current.focus()
        }
    },[editTitle])

    useEffect(() => {
        if(urlRef.current){
            urlRef.current.focus()
        }
       
    },[editUrl])

    const handleEditTitle = () => {
        setEditTitle(true)
    }

    const handleEditUrl = () => {
        setEditUrl(true)
    }

    const handleOnChange = (e) => {
        let value = e.target.value
        
        if (e.target.name === "title"){
            setCurrentTitle(value)
        }
        if (e.target.name === "url"){
            setCurrentUrl(value)
        }
    }

    const handleOnBlur= (e) => {
        if(e.target.name === "title"){
            setEditTitle(false)
        }else if(e.target.name === "url"){
            setEditUrl(false)
        }
        onUpdate(docId, currentTitle, currentUrl)
    }
    const handleDelete = async() => { 
        await onDelete(docId)
    }
    

  return (
    <div className={style.link}>
        <div clasName={style.linkInfo}>
            <div className={style.Title}>
                    {editTitle ? 
                    (
                    <>
                    <input 
                    onBlur={handleOnBlur}
                    ref={titleRef}name="title"
                    value={currentTitle} onChange={handleOnChange}
                    type="text" />
                    </>
                    )
                     : 
                    (
                    <>
                    <button
                    className={style.btnEdit}
                    onClick={handleEditTitle}>
                        <span className="material-icons">edit</span>
                    </button>{currentTitle}
                    </>
                    )
                    }
            </div>
            <div className={style.linkUrl}>
                    {editUrl ? (
                    <>
                    <input
                    onBlur={handleOnBlur}
                    ref={urlRef}
                    name="url"
                    value={currentUrl}
                    onChange={handleOnChange}
                    type="text" />
                    </>) : 
                    (
                    <>
                    <button
                    className={style.btnEdit}
                    onClick={handleEditUrl}>
                        <span className="material-icons">edit</span>
                    </button>{currentUrl}
                    </>
                    )
                        
                    }
           
            </div>
            
        </div>  
        <div className={style.linkActions}>    
            <button className={style.btnDelete} onClick={handleDelete}><span className="material-icons">delete</span></button>    
        </div>    
    </div>
  )
}

export default Link