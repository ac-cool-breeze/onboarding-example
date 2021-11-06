import React from 'react';
import './TaskList.css'
import { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, Snackbar, Card } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core'
import CompletedList from './CompletedList';

const useStyles = makeStyles({
  paper: {
    padding: '15px',
    minWidth: '25vw',
    flexGrow: 1,
    backgroundColor: "#05008f",
    color: "#ffffff",
    borderRadius: "20px",
    margin: '15px'
  },
  card: {
    marginTop: '10px',
    marginBottom: '20px',
    minWidth: '250px',
  },
  cardParent: {
    width: '100%'
  }
});

const TaskList = ({ appUsername }) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState(2)
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false);  // for the are you sure dialog
  const [ isLast, setIsLast ] = useState(false)

  function getTasks() {
    fetch(`https://sdi05-03.staging.dso.mil/api/users/gettasks?id=${userId}`)
      .then(res => res.json())
      .then(res => setTasks(res))
      .catch(err => console.log(err))
  }

  function getUserId() {
    fetch(`https://sdi05-03.staging.dso.mil/api/users/user?name=${appUsername}`)
      .then(res => res.json())
      .then(json => setUserId(json.id))
      .catch(err => console.log(err))
  }

  async function checkLastTask(incTaskId) {
    let response = await fetch(`https://sdi05-03.staging.dso.mil/api/taskers/checklast?user_id=${userId}&task_id=${incTaskId}`)
    let status = await response.status
    if( await status === 200){
      console.log('It is last task!')
      setIsLast(true)
    } else if ( status === 400){
      console.log('There are more tasks')
      setIsLast(false)
    }
  }

  function setCompleted(task) {
    console.log('task.is_complete',task.is_complete )
    checkLastTask(task.taskers_id)
    if( task.is_complete === 'false' ){  // a check to not trigger on unchecking an item.
      checkLastTask(task.taskers_id)
      console.log(isLast)
      //1st check if task is last task
      if( isLast ){
        // if yes, present are you sure dialog
              setOpen(true)
              console.log('Marking all items complete, and triggering new assignment')
              let url = `https://sdi05-03.staging.dso.mil/api/users/complete`
              let postComplete = {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ user_id: userId, task_id: task.id, complete: 'true' })
                }
          
              fetch(url, postComplete)
                .then(res => res.json())
                .then(json => console.log(json.message))
                .then(res => {
                  setUpdate(!update)
                  getTasks()
                })
                .catch(err => alert(err.message))
              setUpdate(!update)
              getTasks()
            // if user says yes to completing entire group then archive all tasks
            // if user says no do nothing and return false ( just to exit func)
      } else {    // if no, do below
            let url = `https://sdi05-03.staging.dso.mil/api/users/complete`
            let postComplete = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, task_id: task.id, complete: 'true' })
              }
        
            fetch(url, postComplete)
              .then(res => res.json())
              .then(json => console.log(json.message))
              .then(res => {
                setUpdate(!update)
                getTasks()
              })
              .catch(err => alert(err.message))
        
            // window.location.reload()
            setUpdate(!update)
            getTasks()
      }
    } else {  //Uncheck item
      let url = `https://sdi05-03.staging.dso.mil/api/users/uncomplete`
      let postComplete = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, task_id: task.id, complete: 'false' })
      }

      fetch(url, postComplete)
      .then(res => res.json())
      .then(json => console.log(json.message))
      .then(res => {
        setUpdate(!update)
        getTasks()
      })
      .catch(err => alert(err.message))

      setUpdate(!update)
      getTasks()
      
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  useEffect(() => {
    getTasks()
  }, [userId])

  useEffect(() => {
    getTasks()
  }, [update])


  return (
    <Paper className='taskList' className={classes.paper}>
      <Grid container>
        <Grid item xs={3}><Typography>Task</Typography></Grid>
        <Grid item xs={3}><Typography>Description</Typography></Grid>
        <Grid item xs={3}><Typography>Due Date</Typography></Grid>
      </Grid>
      <div className={classes.cardParent}>

      {tasks.map(task =>
      
          <Card className={classes.card} style={{
            textDecoration: task.is_complete === 'true' ? 'line-through' : 'none',
            backgroundColor: task.is_complete === 'true' ? '#040147' : '#ffffff',
            color: task.is_complete === 'true' ? '#ffffff' : '#05008f',
          }}><Grid container>
            <Grid item xs={3}><Typography>{task.task_name}</Typography></Grid>
            <Grid item xs={3}><Typography>{task.task_description}</Typography></Grid>
            <Grid item xs={3}><Typography>{task.due_date}</Typography></Grid>
            <Grid item xs={3}><button className='button' id={task.id} name={task.is_complete} onClick={() => setCompleted(task)}><Typography>Complete Task</Typography></button></Grid>
            </Grid>
          </Card>
      )}
      </div>
      <CompletedList open={open} setOpen={setOpen} appUsername={appUsername} update={update} setUpdate={setUpdate}/>
    </Paper>
  )
}

export default TaskList
