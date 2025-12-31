import supabase from "../dbConfig/db"

export const getUser = async() => {
    const { data : {user} } = await supabase.auth.getUser();
    if(user){
         return user
    }else{
        console.log(user);
        
    }

    
}
export const logout = async() => {
    await supabase.auth.signOut()
    alert('Logout Successfull!!!')
}