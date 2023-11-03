import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserData } from '../API/API';

import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: ''
  });

  const [password, setPassword] = useState('');

  function handleEmailChange(id, value){
    setEmail({
      ...email,
      [id]: value
    });
  }

  function handlePasswordChange(e){
    setPassword(e.target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await getUserData(email);

      setEmail({
        email: ""
      })
      setPassword('');
      alert('Login Success!');
      navigate(`/dashboard`); // This is to go to the dashboard page.
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>

      <div className='form-box'>
      <h1>Login</h1>
        <form className='form' onSubmit={handleSubmit}>
          <span className='subtitle'>Login with your credentials here!</span>
          <div className='form-container'>
            <input type='text' className='input' placeholder='Email' id='email' value={email.email} onChange={(e) => handleEmailChange(e.target.id, e.target.value)} required/>
            <br />
            <input type='text' className='input' placeholder='Password' id='password' value={password} onChange={handlePasswordChange} required/>
          </div>
          <button>Login</button>
        </form>
        <div className='form-section'>
          <p>Don't have an account yet? <Link to={'/'}>Sign up here</Link></p>
        </div>
      </div>


    </div>
  )
}

export default Login