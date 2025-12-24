// import { useState } from "react"
// import supabase from "./dbConfig/db"

// const ClassWork = () => {
//    const [space,setSpace] = useState<any>([])
//    const [spaceModal,setSpaceModa] = useState(false)
//    const [spaceObj,setSpaceObj] = useState<any>([])

//    const [ title,setTitle ] = useState('')
 

//    const getSpaces = async() => {
//      const { data,error} = await supabase.from('Space').select('*')    
//      if(error){
//       console.log('Something went wrong',error);
      
//      }else{
//       setSpace(data) 
//      }

     
//      }
// const postSpaceData = async() => {
//       const { error } = await supabase.from('Space').insert({
//         space_name:title
//       })
//       if(error){
//         console.log(error);
        
//       }else{
//         setTitle('')
//       }
      
   
//   //  getSpaces()
    
//   }
//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       {/* <form action=""> */}
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//         <button onClick={postSpaceData}>PostData</button>
//       {/* </form> */}
//     </div>
//   )
// }

// export default ClassWork