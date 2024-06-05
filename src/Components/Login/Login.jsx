import React, { useContext, useEffect, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { login } from '../../Firebase/Config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userProvider';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const logined = await login(email, password)
      if (logined) {
        navigate('/')
      }

    } catch (error) {
        console.log(error)
    }
  } 

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button type='submit' >Login</button>
        </form>
        <a onClick={() => navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
