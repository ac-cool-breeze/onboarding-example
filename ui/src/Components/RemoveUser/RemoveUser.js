import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select"
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: '10px',
        marginBottom: '20px'
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
}));

const RemoveUser = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
        getUsers()
    }, [])

    async function getUsers(){
        const url = `https://sdi05-03.staging.dso.mil/api/users/users`

        await fetch(url)
            .then(res => res.json())
            .then(res => setUsers(res))
            .then(console.log(users))
    }

    function handleUser(e) {
        setUser(e.target.value)
    }

    function handleClick(){
        const url = `https://sdi05-03.staging.dso.mil/api/users/user`

        const deleteUser = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: user })
        }

        fetch(url, deleteUser)
        .then(() => getUsers())
        

        // window.location.reload()
    }

    return (
        <Paper className={classes.paper}>
            <FormControl error>
                <Select
                    value={user}
                    onChange={handleUser}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem style={{ backgroundColor: '#040147'}} value=""><Typography style={{ color: '#ffffff' }}><em>None</em></Typography></MenuItem>
                    {users.map(user =>
                        <MenuItem style={{ backgroundColor: '#040147'}} key={`${user.user_name}`} value={user.user_name}><Typography style={{ color: '#ffffff' }}>{user.user_name}</Typography></MenuItem>
                    )}
                </Select>
            </FormControl> <br />
            <button className='button' onClick={handleClick}><Typography>Remove User</Typography></button>
        </Paper>
    )
}

export default RemoveUser;