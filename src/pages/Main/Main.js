import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:4000/auth";


const Main=({accessToken})=> {
 
  // const [user,setUser]= useState({})
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchData()
}, [])


console.log(user)
  axios.interceptors.request.use(
    config=>{
      config.headers.authorization=`Bearer ${accessToken}`;
      return config;
    },
    error=>{
      return Promise.reject(error);
    }
  )


  const fetchData = async ()=>{
    try {
      const result = await axios.get(URL)
      setUser(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      
    }
  }

  // const getUser = () => {
  //     fetch(URL)
  //     .then(response => response.json())
  //     .then((result) => setUser(result))
  //     console.log(user)
  // }


  // useEffect(() => getUser(), []);


    const handleLogout=()=>{
        localStorage.removeItem("token");
        window.location.href = '/';
    }



  return (
    <div className='main_container'>
        <nav className='navbar'>
        <h1>Band event</h1>
        
        <button className='btn' onClick={handleLogout}>
            Logout
        </button>
        <button onClick={()=> fetchData()}>
          
    getUser 
        </button>
        </nav>

    </div>
  )
}

export default Main