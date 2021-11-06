import React, { useState, useEffect, useRef } from 'react';
import './AssignTaskGroup.css';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles, Paper } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
    createTaskForm: {
        display: 'inline',
    },
    children: {
        margin: '10px',
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        padding: '15px',
        textAlign: 'center',
        margin: '10px',
        minWidth: '25vw',
        flexGrow: 1,
        backgroundColor: "#05008f",
        color: '#ffffff',
        borderRadius: '20px',
        margin: '15px'
    },
    selected: {
        color: '#ffffff'
    },
    menuItem: {
        color: '#ffffff'
    }
});

const AssignTaskGroup = () => {
    // tasker and group set to id, not name
    const [tasker, setTasker] = useState({});
    const [group, setGroup] = useState({});
    const [taskList, setTaskList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const classes = useStyles();

    function getTaskList() {
        fetch(`https://sdi05-03.staging.dso.mil/api/taskers/tasklist`)
            .then(res => res.json())
            .then(json => setTaskList(json))
    }

    function getGroupList() {
        fetch(`https://sdi05-03.staging.dso.mil/api/groups/grouplist`)
            .then(res => res.json())
            .then(json => setGroupList(json))
    }

    function handleAdd() {
        fetch(`https://sdi05-03.staging.dso.mil/api/taskers/assigngroup`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_id: tasker.id,
                group_id: group.id
            })
        })
        alert(`added ${tasker.task_name} to ${group.name}`)
        setTasker({})
        setGroup({})
        window.location.reload()
    }

    function handleTaskChange(e) {
        setTasker(e.target.value)
    }

    function handleGroupChange(e) {
        setGroup(e.target.value)
    }

    useEffect(() => {
        getTaskList()
        getGroupList()
    }, [])

    return (
        <Paper className={classes.paper}>
            <FormControl error id="assign-tg-form" data-testid="AssignTaskGroupForm" className={classes.createTaskForm} autoComplete="off">
                <Typography>Task Name</Typography>
                <Select
                    onChange={handleTaskChange}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                >
                    <MenuItem value="" style={{ backgroundColor: '#040147'}}>
                    <Typography style={{ color: '#ffffff' }}><em>None</em></Typography>
                    </MenuItem>
                    {taskList.map(tasker => <MenuItem value={tasker} style={{ backgroundColor: '#040147'}}><Typography style={{ color: '#ffffff' }}>{tasker.task_name}</Typography></MenuItem>)}
                </Select>
                <br />
                <Typography>Add to group</Typography>
                <Select
                    onChange={handleGroupChange}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    backgroundColor="#040147"
                >
                    <MenuItem style={{ backgroundColor: '#040147'}} value="">
                        <Typography style={{ color: '#ffffff' }}><em>None</em></Typography>
                    </MenuItem>
                    {groupList.map(group => <MenuItem style={{ backgroundColor: '#040147'}} value={group}><Typography style={{ color: '#ffffff' }}>{group.name}</Typography></MenuItem>)}
                </Select>
                <br />
                <button className='button' onClick={handleAdd} variant='contained' color='primary'><Typography>Add to Group</Typography></button>
            </FormControl >
        </Paper>
    )
}

export default AssignTaskGroup