import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import {getStorage, ref, uploadBytes, getDownloadURL, getBytes} from "firebase/storage"
import {getFirestore, collection, addDoc, getDocs, doc, getDoc, query, linkWithRedirect, setDoc, deleteDoc, where} from "firebase/firestore"
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDkQ9azeNQFcoqCqLacVq0e6gFopQo31P4",

    authDomain: "treelink-a7451.firebaseapp.com",
  
    projectId: "treelink-a7451",
  
    storageBucket: "treelink-a7451.appspot.com",
  
    messagingSenderId: "601773627226",
  
    appId: "1:601773627226:web:962bb04b8f9c72488dc563"
  
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const userExists = async (uid) => {
    const docRef = doc(db, "users", uid)
    const res = await getDoc(docRef)
 
    return res.exists()  
}

export const existUserName = async(username) => {
    const users = []
    const docsRef = collection(db, "users")
    const q = query(docsRef, where("username", "==", username))
 
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {users.push(doc.data())})
    return users.length > 0 ? users[0].uid : null
} 

export const registerNewUser = async(user) => {
    try {
        
        await setDoc(doc(db, "users", user.uid), user)
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async(user) => {
    try {
       
       
     
        await setDoc(doc(db, "users", user.uid), user)
        
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfo = async(uid) => {
    try {
        const docRef = doc(db, "users", uid)
        const document = await getDoc(docRef)
        return document.data()
    } catch (error) {
        
    }
}

export const insertNewLink = async (link) => {
    try {
        const docRef = collection(db, "links")
        const res = await addDoc(docRef, link)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getLinks = async(uid) => {
    const links = []
    try {
        const collectionRef = collection(db, "links");
        const q = query(collectionRef, where("uid", "==", uid))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            const link = {...doc.data()};
            link.docId = doc.id
            links.push(link)
        })
        return links
    } catch (error) {
        
    }
}

export const updateLink = async(docId, link) => {
    try {
        const docRef = doc(db, "links", docId)
        const res = await setDoc(docRef, link)
        return res;
    } catch (error) {
        console.log(error)
    } 
}

export const deleteLink = async(docId) => {
    try {
        const docRef = doc(db, "links", docId)
        const res = await deleteDoc(docRef)
        return res
    } catch (error) {
        
    }
}

export const setUserProfilePhoto = async (uid, file) => {
    try {
        const imageRef = ref(storage, `images/${uid}`)
        const resUpload = await uploadBytes(imageRef, file)
        return resUpload
    } catch (error) {
        
    }
    
}

export const getProfilePhoto = async(profilePicture) => {
    try {
        const imageRef = ref(storage, profilePicture)

        const url = await getDownloadURL(imageRef)

        return url
    } catch (error) {
        
    }
}

export const getUserPublicProfileInfo = async (uid) => {
    try {
    const profileInfo = await getUserInfo(uid)
    const linksInfo = await getLinks(uid)
    return {profileInfo: profileInfo, linksInfo: linksInfo}
    } catch (error) {
        console.log(error)
    }
    
}

export const logOut = async() => {
    await auth.signOut()
}