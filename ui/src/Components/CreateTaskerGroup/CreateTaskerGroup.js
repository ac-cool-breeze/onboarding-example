import React from 'react';
import './CreateTaskerGroup.css';
import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Snackbar, Paper } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    createTaskForm: {
        display: 'inline',
    },
    children: {
        margin: '10px',
        color: '#ffffff',
        underlineColor: '#ffffff'
    },
    paper: {
        padding: '20px',
        textAlign: 'center',
        minWidth: '25vw',
        flexGrow: 1,
        backgroundColor: '#05008f',
        color: '#ffffff',
        borderRadius: '20px',
        margin: '15px'
    },
    alert: {
        color: '#000000'
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateTaskerGroup = () => {
    const classes = useStyles();
    const [groupName, setGroupName] = useState('')
    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);


    function handleClick(e) {
        e.preventDefault();

        const postGroup = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: groupName
            })
        }

        console.log('postGroup',postGroup)

        fetch(`https://sdi05-03.staging.dso.mil/api/groups/creategroup`, postGroup)
        .then(res => {
            if(res.status === 200){
                console.log('res',res)
                setOpen(true)
            } else {
                console.log('res',res)
                setOpenFail(true)
            }
        })

        setGroupName('')
    }

    function handleGroupName(e){
        setGroupName(e.target.value)
        console.log('handleGroupName',groupName)
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
        <Paper className={classes.paper}>
        <form data-testid="createTaskForm" className={classes.createTaskForm} autoComplete="off">
            <FormControl>
                <Typography>Name of Group</Typography>
                <Input error placeholder='Name of Group' id="group-name" className={classes.children} value={groupName} onChange={handleGroupName}/>
            </FormControl>
            <br />
            <button className='button' variant='contained' color='primary' onClick={handleClick}><Typography>Create Group</Typography></button>
        </form>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert className={classes.alert} onClose={handleClose} severity="success">
                Tasker group created successfully!
            </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openFail} autoHideDuration={1000} onClose={handleFailClose}>
            <Alert className={classes.alert} onClose={handleFailClose} severity="error">
                Error tasker group creation failed!
            </Alert>
        </Snackbar>
        </Paper>
    )
}

export default CreateTaskerGroup;