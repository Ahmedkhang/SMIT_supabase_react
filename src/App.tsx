import { useState } from "react"
import supabase from "./dbConfig/db"

const App = () => {
  const [ title,setTitle ] = useState('')
  const [ description,setDescription] = useState('')
  const [ status,setStatus] = useState('')
  const [data,setData] = useState<any>([])
  const post = async() => {
     const { error } = await supabase.from('task').insert({
      title:title,
      description:description,
      status:status

     })
     console.log(error);
     
  }
  const get = async() => {
    const { data,error } = await supabase.from('task').select('*')
    setData(data || [])
    console.log(data);
    
  }
  const deleteData = async() => {
    const response = await supabase.from('task').delete().eq('status','working')
    console.log(response);
    
  }
  const updateData = async() => {
    const { error } = await supabase.from('task').update({'status':'completed'}).eq('id',1)
    console.log(error);
    
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">

    <form action="" className="flex flex-col gap-5 ">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-black" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      <button onClick={post}>PostData</button>
    </form>
      <button onClick={get}>GetData</button>
      <button onClick={deleteData}>Delete Pending Todos</button>
      <button onClick={updateData}>Update Data</button>
      <div>
        <h1>My Todos</h1>
        {data.map((items:any,index:any) => (
          <div className=" p-5 h-auto " key={index}>
             <h1 className="text-sm">{items.title}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App