import React, { useState } from 'react';
import { Paper, Grid, Typography, Button, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import TaskerGroups from './Roles';
import Users from './Users';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles({
    parent:{
        display: 'flex',
        padding: '5px'
    },
    children: {
    alignSelf: 'center',
      margin: '10px',
    },
    paper: {
        display: 'flex',
        flexGrow:1,
        padding: '5px',
        textAlign: 'center',
        margin: '10px',
        minWidth: '25vw',
        justifyContent: 'center',
        backgroundColor: '#05008f',
        color: '#ffffff',
        borderRadius: '20px',
        margin: '15px'
    },
});

const AssignRoleUser =()=>{
    const classes = useStyles();
    const [ selectedRoleId, setSelectedRoleId ] = useState('')
    const [ selectedUserName, setSelectedUserName ] = useState('')
    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handleClick=(e)=>{
        let reqOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name : selectedUserName, newRole: selectedRoleId })
        }

        console.log(reqOptions)

        fetch(`https://sdi05-03.staging.dso.mil/api/users/updaterole`, reqOptions)
        .then( res => res.json())
        .then( data => {
            if( data.message === 'user updated' ){
                setOpen(true);
            } else if(data.message != 'user updated'){
                setOpenFail(true)
            }
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
                <div>
                <Typography variant="h5">Assign role to a user.</Typography>
                <Grid container>
                    <Grid item sm={4}><Typography variant="h6">Role</Typography></Grid>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}><Typography variant="h6">User</Typography></Grid>

                    <Grid item sm={4}><TaskerGroups setSelectedRoleId={setSelectedRoleId}/></Grid>
                    <Grid item sm={4}><Typography variant="h6">➔</Typography></Grid>
                    <Grid item sm={4}><Users setSelectedUserName={setSelectedUserName}/></Grid>

                    <Grid item sm={4}> </Grid>
                    <Grid item sm={4}><button className="button" onClick={handleClick}><Typography>Assign</Typography></button></Grid>
                    <Grid item sm={4}> </Grid>
                </Grid>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Role successfully added to user!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openFail} autoHideDuration={1000} onClose={handleFailClose}>
                    <Alert onClose={handleFailClose} severity="error">
                        Error Role failed!
                    </Alert>
                </Snackbar>
                </div>
            </Paper>
        </>
    )
}

export default AssignRoleUser