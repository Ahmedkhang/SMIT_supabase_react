// import React from 'react'

import { useState } from "react"
import supabase from "../dbConfig/db"
import { useNavigate } from "react-router"
// import { sign } from "crypto"

const LoginPage = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const navigate = useNavigate()
const signin = async(e:React.FormEvent) => {
    e.preventDefault()
    const { error,data} = await supabase.auth.signInWithPassword({
        email:email,
        password:password
    })
    if(error){
        console.log(`Something Went Wrong!! ${error.message}`)
        console.log(data)

    }else{
           navigate('/')
    }
}


  return (
    <>
           <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={signin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Login
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded hover:bg-green-700 cursor-pointer duartion-300 transition"
          >
            Login
          </button>
            <p onClick=navigate('/signup') className='text-center'>signup</p>
        </div>
      </form>
    </div>

    </>
  )
}

export default LoginPage
