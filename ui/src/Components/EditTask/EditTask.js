import React, { useState, useEffect, useRef } from 'react';
import './EditTask.css';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Typography, makeStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles({
  createTaskForm: {
    display: 'inline',
  },
  children: {
    margin: '10px',
  }
});

const EditTask = () => {
  const [tasker, setTasker] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(0);
  const classes = useStyles();

  function getTaskList() {
    fetch(`https://sdi05-03.staging.dso.mil/api/taskers/tasklist`)
      .then(res => res.json())
      .then(json => setTaskList(json))
  }

  function editTask() {
    fetch(`https://sdi05-03.staging.dso.mil/api/taskers/edittask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: tasker.id,
        task_name: name,
        task_description: description,
        time_to_complete: timeToComplete
      })
    })
    .then(res => res.json())
    .then(json => alert(`'${name}' ${json.message}`))
    .catch(err => alert('update unsuccessful'))
    setTasker({})
  }

  function handleTaskChange(e) {
    setTasker(e.target.value)
  }

  useEffect(() => {
    getTaskList()
  }, [])

  useEffect(() => {
    setName(tasker.task_name || '')
    setDescription(tasker.task_description || '')
    setTimeToComplete(tasker.time_to_complete || '')
  }, [tasker])

  return (
    <FormControl id="assign-tg-form" data-testid="AssignTaskGroupForm" className={classes.createTaskForm} autoComplete="off">
      <Typography>Task Name</Typography>
      <Select
        onChange={handleTaskChange}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {taskList.map(tasker => <MenuItem value={tasker}>{tasker.task_name}</MenuItem>)}
      </Select>
      <br />
      {tasker.task_name ?
        <div>
          <Typography>
            Name
          </Typography>
          <Input
            id="task-name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={classes.children} />
          <br />
          <Typography>
            Description
          </Typography>
          <Input
            multiline
            maxRows={4}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={classes.children} />
          <br />
          <Typography>
            Time to Complete
          </Typography>
          <Input
            type="number"
            id="time-to-complete"
            onChange={(e) => setTimeToComplete(e.target.value)}
            value={timeToComplete}
            className={classes.children} />
          <br />
          <Button
            onClick={editTask}
            variant='contained'
            color='primary'>
            Submit
          </Button>
        </div>
        :
        <Typography>
          Select a task to edit
        </Typography>
      }
    </FormControl >
  )
}


export default EditTask