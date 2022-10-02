import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, sendSignInLinkToEmail} from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import { auth, userExists } from "../firebase/Firebase"
import style from "./Login.module.css"


const Login = () => {
    //const [currentUser, setCurrentUser] = useState(null);
    const [currentState, setCurrentState] = useState(0);
    const [form, setForm] = useState(false)
    const [email, setEmail] = useState("")
    const [nombre, setNombre] = useState("")
    const [error, setError] = useState("")
    
    const [password, setPassword] = useState("")
   
   
    const [login, setLogin] = useState(false)
            // 0: Inicializado
            // 1: Loading
            // 2: login completo
            // 3: login sin registro
            // 4: no hay nadie logeado
    const navigate = useNavigate()
    
   

    const handleClick = async () => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithGoogle(googleProvider)

        
   
    }
    const signInWithGoogle = async (googleProvider) => {
        try {
            await signInWithPopup(auth, googleProvider)
           
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        if(e.target.name === "email"){
            
            setEmail(e.target.value)
            
        }
        if(e.target.name === "password"){
            setPassword(e.target.value)
            
        }if(e.target.name === "nombre"){
            setNombre(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        registrador()
    }

    const handleSubmit2 = async(e) => {
        e.preventDefault()
      
        await logeador()
    }

   

    const registrador = async() => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            user.displayName = nombre
         
           
            
            // ...
        })
        .catch((error) => {
            console.log(error)
            
            // ..
        });
     
    }
    

   

    const logeador = async() => {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        
          // ...
        })
        .catch((error) => {
            console.log(error.code)
            if(error.code === "auth/wrong-password"){
                setError("contraseña incorrecta")
            }
            

            
        });
    }
   

    const handleUserLoggedIn = (user) =>{
        navigate("/dashboard")
    }
    
    const handleUserNotRegistered = (user) =>{
        navigate("/choose-username")
    }

    const handleUserNotLoggedIn = (user) =>{
        setCurrentState(4)
    }

    if(form) {
        return (
            <form onSubmit={handleSubmit} className={style.loginView}>
                <label htmlFor="email"></label>
                Email: <input onChange={handleChange} name="email" type="text" />
                <label htmlFor="nombre"></label>
                Nombre: <input onChange={handleChange} name="nombre" type="text" />
                <label htmlFor="password"></label>
                Password: <input onChange={handleChange} name="password" type="text" />
                <button type="submit" className="btn">Registar</button>
            </form>
        )
    }

    if(login) {
        return (
            <form onSubmit={handleSubmit2} className={style.loginView}>
                <label htmlFor="email"></label>
                Email: <input onChange={handleChange} name="email" type="text" />
                <label htmlFor="password"></label>
                Password: <input onChange={handleChange} name="password" type="text" />
                <button className="btn" type="submit">Logear</button>
                {
                    error ? <div>{error}</div> : null
                }
            </form>
        )
    }

    if(currentState === 4) { 
        return (
            <div className={style.loginView}>
                <h1>Link tree</h1>
                <button className={style.providerBlack} onClick={handleClick}>Log in with google</button>
                <button className={style.provider} onClick={()=> setForm(true)}>Register with Email and Password</button>
                <button className={style.providerBlack} onClick={()=> setLogin(true)}>Log in with Email and Password</button>
            </div>
            
          )
    }
    
    

    return(
    <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotLoggedIn}>
         <>Loading...</>
    </AuthProvider>
    )
}

export default Login