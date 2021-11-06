import { makeStyles, Paper, Typography, FormControl, Input, Button, Grid, Divider } from '@material-ui/core'
import { useEffect, useState } from 'react';
import PasswordChange from './SubComponents/PasswordChange'
import React from 'react';
import './MyAccount.css'

const apiUrl = `https://sdi05-03.staging.dso.mil/api`

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
        alignSelf: 'center',
        padding: '20px',
        textAlign: 'center',
        margin: '15px',
        minWidth: '25vw',
        flexGrow: 1,
        backgroundColor: '#05008f',
        color: '#ffffff',
        borderRadius: '20px'
    },
});


const MyAccount =({ appUsername })=>{

    const classes = useStyles();
    const [ roleName, setRoleName ] = useState('');
    const [ listOfCurrentTasks, setListOfCurrentTasks ] = useState(<Typography variant="subtitle">Loading...</Typography>)
    const [ listOfCurrentGroups, setListOfCurrentGroups ] = useState(<Typography variant="subtitle">Loading...</Typography>)
    const [ currentRole, setCurrentRole ] = useState(<Typography variant="subtitle">Loading...</Typography>)
    const [ groupId, setGroupId ] = useState('')
    const [ userId, setUserId] = useState('')

    const getUserId = async () =>{
        let response = await fetch(`${apiUrl}/users/user?name=${appUsername}`)
        let data = await response.json()
        let incUserId = await data.id
        let groupresponse = await fetch(`${apiUrl}/groups/usergroupname?id=${incUserId}`)
        let groupname = await groupresponse.json()
        console.log(groupname)
        setListOfCurrentGroups(groupname.name)
        setUserId(incUserId)
        return await incUserId
    }

    const getCurrentRole = async () =>{
        let response = await fetch(`${apiUrl}/roles/role?name=${appUsername}`)
        let data = await response.json()
        let role = await data.rolename
        setCurrentRole(role)
        return role
    }

    useEffect(()=>{
        getCurrentRole()
    },[ currentRole ] )

    useEffect(()=>{
        getUserId()
    },[ userId ])

    return (
        <>
            <Grid container spacing={1} className={classes.parent}>
                <Grid container item xs={12} spacing={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.children}>User Name</Typography>{appUsername}
                    </Paper>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Paper className={classes.paper}>
                    <PasswordChange/>
                    </Paper>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.children}>Current Role </Typography>{ currentRole }
                    </Paper>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.children}>Current Task Groups</Typography>{ listOfCurrentGroups }
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default MyAccount

{/* <Button variant='contained' color='primary' className={classes.children}>Update Password</Button> */}