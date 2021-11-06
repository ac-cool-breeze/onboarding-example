import React from 'react';
import './AdminTaskList.css'
import { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  paper: {
    padding: '15px',
    textAlign: 'center',
    minWidth: '25vw',
    flexGrow: 1,
    backgroundColor: "#05008f",
    color: "#ffffff",
    borderRadius: "20px",
    margin: '15px'
  },
});

const AdminTaskList = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [update, setUpdate] = useState(false)

  function getTasks() {
    fetch(`https://sdi05-03.staging.dso.mil/api/taskers/admintasklist`)
      .then(res => res.json())
      .then(res => setTasks(res))
      .catch(err => console.log(err))
  }

  function getUsers() {
    fetch(`https://sdi05-03.staging.dso.mil/api/users/users`)
      .then(res => res.json())
      .then(res => setUsers(res))
      .catch(err => console.log(err))
  }

  function setArchived(task) {
    // let id = parseInt(e.target.id)
    let postComplete = {}
    let url = ''
    if (task.archived === false) {
      url = `https://sdi05-03.staging.dso.mil/api/users/archivetask`
      postComplete = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id })
      }
    } else {
      url = `https://sdi05-03.staging.dso.mil/api/users/unarchivetask`
      postComplete = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id })
      }
    }

    fetch(url, postComplete)
      .then(res => res.json())
      .then(json => console.log(json.message))
      .catch(err => alert(err.message))

    // window.location.reload()
    setUpdate(!update)
    getTasks()
    getUsers()
  }

  function RenderList() {
    if (tasks.length < 1) {
      return (
        <div className='item'><Typography>No tasks found</Typography></div>
      )
    } else if (selectedUser.length > 0) {
      let filteredUsers = tasks.filter(task => task.user_name === selectedUser)
      if (filteredUsers.length > 1) {
        return (
          <div>
            {filteredUsers.map(task =>
              <div className='row' style={{ textDecoration: task.archived === true ? 'line-through' : 'none' }}>
                <div className='item'><Typography>{task.user_name}</Typography></div>
                <div className='item'><Typography>{task.task_name}</Typography></div>
                <div className='item'><Typography>{task.due_date}</Typography></div>
                <div className='item'><Typography>{task.is_complete}</Typography></div>
                <div className='item'><Typography>{task.completed_date}</Typography></div>
                <div className='item'><button className='button' id={task.id} name={task.archived} onClick={() => setArchived(task)}><Typography>Archive Task</Typography></button></div>
              </div>
            )}
          </div>
        )
      } else {
        return (
          <div className='item'><Typography>No tasks found</Typography></div>
        )
      }
    } else {
      return (
        <div>
          {tasks.map(task =>
            <div className='row' style={{ textDecoration: task.archived === true ? 'line-through' : 'none' }}>
              <div className='item'><Typography>{task.user_name}</Typography></div>
              <div className='item'><Typography>{task.task_name}</Typography></div>
              <div className='item'><Typography>{task.due_date}</Typography></div>
              <div className='item'><Typography>{task.is_complete}</Typography></div>
              <div className='item'><Typography>{task.completed_date}</Typography></div>
              <div className='item'><button className='button' id={task.id} name={task.archived} onClick={() => setArchived(task)}><Typography>Archive Task</Typography></button></div>
            </div>
          )}
        </div>
      )
    }
  }

  function nameSelect(e) {
    setSelectedUser(e.target.value)
    getTasks()
    getUsers()
    setUpdate(!update)
  }

  useEffect(() => {
    getTasks()
    getUsers()
  }, [])

  useEffect(() => {
    getTasks()
    getUsers()
  }, [update])

  return (
    <Paper className='taskList' className={classes.paper}>
      <div className='row'>
        <div className='item'><Typography>User</Typography></div>
        <div className='item'><Typography>Task</Typography></div>
        <div className='item'><Typography>Due Date</Typography></div>
        <div className='item'><Typography>Complete</Typography></div>
        <div className='item'><Typography>Completed Date</Typography></div>
        <div className='item'>
          <InputLabel style={{color: '#ffffff'}}>Search By User</InputLabel>
          <Select error onChange={nameSelect}>
            <MenuItem
              style={{ backgroundColor: '#040147'}}
              value="">
              <Typography style={{ color: '#ffffff' }}><em>None</em></Typography>
            </MenuItem>
            {users.map(user => <MenuItem style={{ backgroundColor: '#040147'}}  value={user.user_name}><Typography style={{ color: '#ffffff' }}>{user.user_name}</Typography></MenuItem>)}
          </Select></div>
      </div>
      <RenderList />
    </Paper>
  )
}

export default AdminTaskList
