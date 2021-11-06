import { makeStyles, Paper, Typography, FormControl, Input, Button } from '@material-ui/core'
import { useState } from 'react';
import React from 'react';



const useStyles = makeStyles({
    createTaskForm: {
        display: 'inline',
    },
    children: {
        margin: '10px',
    },
    paper: {
        padding: '15px',
        textAlign: 'center',
        margin: '15px',
        minWidth: '25vw',
        flexGrow: 1,
        backgroundColor: '#05008f',
        color: '#ffffff',
        borderRadius: '20px'
    }
})


const CreateRole = () => {

    const classes = useStyles();
    const [roleName, setRoleName] = useState('');

    function handleSubmit(event) {
        event.preventDefault()

        let url = `https://sdi05-03.staging.dso.mil/api/roles/newrole`

        const postUserLogin = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rolename: roleName,
            })
        }

        fetch(url, postUserLogin)
            .then(res => {
                if (res.status === 400) {
                    alert('Error on role creation.')
                } else {
                    console.log('good hit')
                    setRoleName('')
                }
            })
    }   // end of handleSubmit()

    // Input handlers
    function handleRoleName(e) {
        setRoleName(e.target.value)
    }

    return (
        <>
            <Paper className={classes.paper}>
                <form data-testid="createTaskForm" className={classes.createRoleForm} autoComplete="off">
                    <FormControl>
                        <Typography>New Role Name:</Typography>
                        <Input id="task-name" className={classes.children} onChange={handleRoleName} value={roleName} />
                    </FormControl>
                    <br />
                    <button className='button' onClick={handleSubmit}><Typography>Create New Role</Typography></button>
                </form>
            </Paper>
        </>
    )
}

export default CreateRole