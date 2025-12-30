// import React from 'react'

import { useState } from "react"
import supabase from "../dbConfig/db"
// import { sign } from "crypto"

const SignupPage = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const signup = async() => {
    const { error,data} = await supabase.auth.signUp({
        email:email,
        password:password
    })
    if(error){
        console.log(`Something Went Wrong!! ${error.message}`)
        console.log(data)

    }else{
        console.log(data);        
    }
}


  return (
    <>
    <h1>Signup</h1>

    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
    
    <button onClick={signup}>Signup</button>
    </>
  )
}

export default SignupPage