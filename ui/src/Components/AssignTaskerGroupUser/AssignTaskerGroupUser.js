import React, { useState } from 'react';
import { Paper, Grid, Typography, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import TaskerGroups from './TaskerGroups';
import Users from './Users';
import './AssignTaskerGroupUser.css'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    parent: {
        display: 'flex',
        padding: '5px',
    },
    children: {
        alignSelf: 'center',
        margin: '10px',
    },
    paper: {
        display: 'flex',
        padding: '15px',
        textAlign: 'center',
        margin: '15px',
        minWidth: '25vw',
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#05008f',
        color: '#ffffff',
        borderRadius: '20px'
    },
});

const AssignTaskerGroup = () => {
    const classes = useStyles();
    const [selectedGroupId, setSelectedGroupId] = useState('')
    const [selectedUserId, setSelectedUserId] = useState('')
    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handleClick = (e) => {
        let reqOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: selectedUserId, newGroup: selectedGroupId })
        }


        fetch(`https://sdi05-03.staging.dso.mil/api/users/assigngroup`, reqOptions)
        .then( res => res.json())
        .then( data => {
            if( data.message === 'tasks added' ){
                setOpen(true);
            } else {
                setOpenFail(true)
            }
        })
        .then( res => {
            let addTaskOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: selectedUserId })
            }
            fetch('https://sdi05-03.staging.dso.mil/api/users/addtasks', addTaskOptions)
        })

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
                <div className='grid'>
                    <Typography variant="h5">Assign Tasker Group to a User</Typography>
                    <Grid container>
                        <Grid item sm={4}><Typography variant="h6">Task Group</Typography></Grid>
                        <Grid item sm={4}></Grid>
                        <Grid item sm={4}><Typography variant="h6">User</Typography></Grid>

                        <Grid item sm={4}><TaskerGroups setSelectedGroupId={setSelectedGroupId} /></Grid>
                        <Grid item sm={4}><Typography variant="h6">➔</Typography></Grid>
                        <Grid item sm={4}><Users setSelectedUserId={setSelectedUserId} /></Grid>

                        <Grid item sm={4}> </Grid>
                        <Grid item sm={4}><button className='button'onClick={handleClick}><Typography>Assign</Typography></button></Grid>
                        <Grid item sm={4}> </Grid>
                    </Grid>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Task group successfully added to user!
                        </Alert>
                    </Snackbar>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openFail} autoHideDuration={1000} onClose={handleFailClose}>
                        <Alert onClose={handleFailClose} severity="error">
                            Error!
                        </Alert>
                    </Snackbar>
                </div>
            </Paper>
        </>
    )
}

export default AssignTaskerGroup