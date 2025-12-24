// import React from 'react'

import React, { useState } from "react"
import supabase from "../dbConfig/db"
const initialState = {
        full_name:'',
        age:'',
        email:'',
        // roll_number:''
    }

export default function StudentForm () {
    const [formData,setFormData] = useState(initialState)

    const handleChange = (e:any) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

     
    const postStudentData = async(e:React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.from('Students').insert([formData])
        if(error){
            alert(error)
        }else{
            alert('Data Saved Successfully')
            setFormData(initialState)
        }
    }
    
  return (
    <>
    <form onSubmit={postStudentData}>
        <div className="w-125 flex flex-col gap-5">

        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {/* <input type="number" name="roll_number" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} /> */}

        <button type="submit">Save</button>
        </div>
    </form>
    </>
  )
}
