import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './Login.css';
import { Typography } from '@material-ui/core'

function Login({ setIsAuth, setAppUsername }) {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')


  function handleClick(event){
    event.preventDefault()

    const getUserLogin = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({name : userName, password: password})
    }

    // let url = 'https://sdi05-03.staging.dso.mil/api/users/login'  // production
    let url = `https://sdi05-03.staging.dso.mil/api/users/login`

    // fetch/post user login
    fetch(url , getUserLogin)
      .then(data => data.json())
      .then( res => {
        if(res.message === 'Incorrect username/password'){
          setIsAuth(false)
          alert("Please enter correct username and/or password.")
        } else if(res.message === 'Correct Combonation'){
          setIsAuth(true)
          setAppUsername(res.name)
        }
      })
  }

  return (
    <div className='LoginScreen'>
      <Typography><h1>Login to our website</h1></Typography>
      <form data-testid="loginForm" className="LoginForm">
        <FormControl error>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input style={{color: '#ffffff'}}onChange={(e) => setUsername(e.target.value)}
            id="username"
            inputProps={{'data-testid':'username'}}
            />
        </FormControl>
        <br />
        <FormControl error>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input style={{ color: '#ffffff'}}onChange={(e) => setPassword(e.target.value)}
          inputProps={{'data-testid':'password'}}
            type="password" id="password" />
        </FormControl>
        <br />
        <button className='button' onClick={handleClick} name="loginButton" inputProps={{ 'data-testid':'loginButton'}}>
          <Typography>Login</Typography>
        </button>
      </form>
    </div>
  )
}

export default Login;