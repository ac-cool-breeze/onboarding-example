import React from 'react';
import './CreateTask.css';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Paper, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { createTheme } from '@material-ui/core'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles({
    createTaskForm: {
        display: 'inline',
    },
    children: {
        margin: '10px',
        color: '#ffffff',
    },
    paper: {
        padding: '20px',
        textAlign: 'center',
        margin: '10px',
        minWidth: '25vw',
        flexGrow: 1,
        backgroundColor: "#05008f",
        color: "#ffffff",
        borderRadius: "20px",
        margin: '15px'
    },
    snackbar: {
        backgroundColor: '#ba000d',
        color: '#ffffff',
        borderRadius: '5px',
    },
    snackbarGreen:{
        backgroundColor: 'green',
        color: '#ffffff',
        borderRadius: '5px', 
    }
});


const CreateTask = () => {

    const classes = useStyles();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDuration, setTaskDuration] = useState('');
    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()

        let url = `https://sdi05-03.staging.dso.mil/api/taskers/createtask`

        const postUserLogin = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task_name: taskName,
                task_description: taskDescription,
                time_to_complete: parseInt(taskDuration)
            })
        }

        fetch(url, postUserLogin)
            .then(res => {
                if (res.message === 'task created') {
                    setOpen(true);
                } else if (res.message !== 'task created') {
                    setOpenFail(true)
                }
            })
    }   // end of handleSubmit()

    // Input handlers
    function handleTaskName(e) {
        setTaskName(e.target.value)
    }

    function handleTaskDescription(e) {
        setTaskDescription(e.target.value)
    }

    function handleTaskDuration(e) {
        setTaskDuration(e.target.value)
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    const handleFailClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFail(false);
    }


    return (
        <>
        <Paper className={classes.paper}>
            <div>
            <form data-testid="createTaskForm" className={classes.createTaskForm} autoComplete="off">
                <FormControl>
                    <Typography>Name of Task</Typography>
                    <Input error placeholder='Name of Task' id="task-name" className={classes.children} onChange={handleTaskName} />
                </FormControl>
                <br />
                <FormControl>
                    <Typography>Task Duration</Typography>
                    <Input error placeholder='Task Duration' id="task-duration" className={classes.children} onChange={handleTaskDuration} />
                </FormControl>
                <br />
                <FormControl>
                    <Typography>Task Description</Typography>
                    <Input error placeholder='Task Description' id="task-description" className={classes.children} onChange={handleTaskDescription} />
                </FormControl>
                <br />
            </form>
                <button className='button' color='primary'  variant='contained'onClick={handleSubmit}><Typography>Create Task</Typography></button>
            </div>
        </Paper>
                <Snackbar className={classes.snackbarGreen} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert className={classes.snackbarGreen} onClose={handleClose} severity="success">
                        Task create successfully!
                    </Alert>
                </Snackbar>
                <Snackbar className={classes.snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openFail} autoHideDuration={1000} onClose={handleFailClose}>
                    <Alert className={classes.snackbar} onClose={handleFailClose} severity="error">
                        Error Task Creation failed!
                    </Alert>
                </Snackbar>
        </>
    )
}

export default CreateTask