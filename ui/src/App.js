import React from 'react';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home'
import './App.css';
import { useState } from 'react'
import { purple, green } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#05008a',
      dark: '#4e4e4e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
    error: {
      main: '#ffffff'
    }
  },
});

function App() {

  const [ isAuth, setIsAuth ] = useState(false);
  const [ appUsername, setAppUsername] = useState('')

  const authenticated = () => {
    console.log(isAuth)
    console.log('App.js appUsername:', appUsername)
    if(isAuth){
      return <Home setIsAuth={setIsAuth} appUsername={appUsername} />
    } else if(!isAuth){
      //window.location.href('https://sdi05-03.staging.dso.mil/')
      return <Login setIsAuth={setIsAuth} setAppUsername={setAppUsername}/>
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        { authenticated() }
      </div>
    </ThemeProvider>
  );
}

export default App;