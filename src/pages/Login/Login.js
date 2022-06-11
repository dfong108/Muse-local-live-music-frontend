import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './style.css'


const Login=()=> {
    const [checked, setChecked] = useState(true);
  const [data,setData]= useState({
    email:'',
    password:''

  })
  

  console.log(data)
  const [error, setError]=useState('');

  const handleChange=({currentTarget:input})=>{
    setData({...data,[input.name]:input.value})
  }
 const handleSubmit= async (e) =>{
   e.preventDefault();
   console.log(data)
   try {
     const url ="http://localhost:4000/auth";
     const {data:res} = await axios.post(url,data);
    localStorage.setItem("token",res.data);
    console.log(localStorage)
    window.location="/home"
 
     console.log(res.message)
   } catch (error) {
     if(error.response && error.response.status >= 400 &&
      error.response.status <= 500){
        setError(error.response.data.message)
      }
   }
   console.log(data)
 }

  return (
 <div className='container'>
<div className="login-wrap">
      <div className="login-html">

        <input id="tab-1" type="checkbox"  name="tab" class="sign-up"  checked/>
   
        <label for="tab-1" class="tab">Sign In</label>
 
      
        <div class="login-form">
          
          <div class="sign-up-htm">
            <form className={styles.form_container} onSubmit={handleSubmit}>
           
              <div class="group">
                <label  class="label">Email Address</label>
                <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  onChange={handleChange}
                  value={data.email}
                  required
                  id="email"
                  className='input'
                />
              </div>
                 
              <div class="group">
                <label  class="label">Password</label>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange}
                  value={data.password}
                  required
                  id="pass"
                  data-type="password"
                  className='input'
                />
              </div>
              <div className="group">
					<input id="check" type="checkbox" class="check" checked={checked}  onChange={() => setChecked(!checked)}/>
					<label for="check"><span class="icon"></span> Keep me Signed in</label>
          </div>
          <div className="group">
              {error && <div className='error_msg'>{error}</div>}
              </div>
              <div className="group">
                <input type="submit" className="button" value="Login" />
              </div>
              <div className="group">
              <Link to="/signup">
                <input type="button" className="button" value="Go to Sign Up" />
              </Link>
              </div>
              <div class="hr"></div>
              <div class="foot-lnk">

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login

//https://codepen.io/khadkamhn/pen/ZGvPLo