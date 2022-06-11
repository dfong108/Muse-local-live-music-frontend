
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './style.css'


const Signup = () => {

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/users";
      const { data: res } = await axios.post(url, data);
      navigate('/login')
      console.log(res.message)
    } catch (error) {
      if (error.response && error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }
  return (
    <div className="login-wrap">
      <div className="login-html">

    
     

        <input id="tab-2" type="checkbox"  name="tab" class="sign-up"    checked />
   
        <label for="tab-2" class="tab">Sign Up</label>
        <div class="login-form">
          
          <div class="sign-up-htm">
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <div class="group">
                <label class="label">First Name</label>
                <input
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  id="firstname"
                  className='input'
                />
              </div>
              <div class="group">
                <label class="label">Last Name</label>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  id="lastname"
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
                  className='input'
                />
              </div>
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
              <div className="group">
              {error && <div className='error_msg'>{error}</div>}
              </div>
              <div className="group">
                <input type="submit" className="button" value="Sign Up" />
              </div>
              <div className="group">
              <Link to="/login">
                <input type="button" className="button" value="Sign In" />
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
  )
}

export default Signup
// https://codepen.io/khadkamhn/pen/ZGvPLo