import React, { useEffect } from 'react';
import { FormControl, Select, MenuItem, FormHelperText, makeStyles, Typography } from "@material-ui/core"
import { useState } from 'react';

const apiUrl = `https://sdi05-03.staging.dso.mil/api/groups/grouplist`

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '5px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: '10px',
  },
}));


const TaskerGroups = ({ setSelectedGroupId }) => {
  const classes = useStyles();
  const [taskGroup, setTaskGroup] = useState('');
  const [groupList, setGroupList] = useState(['Loading...'])

  const getGroups = async () => {
    let response = await fetch(apiUrl)
    let data = await response.json()
    setGroupList(data)
  }

  const handleChange = (event) => {
    setTaskGroup(event.target.value);
    setSelectedGroupId(event.target.value)
  };

  useEffect(() => {
    getGroups()
  }, [])

  return (
    <FormControl error className={classes.formControl}>
      <Select
        value={taskGroup}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem style={{ backgroundColor: '#040147'}} value=""><Typography style={{ color: '#ffffff' }}><em>None</em></Typography></MenuItem>
        {groupList.map(ele => {
          return <MenuItem style={{ backgroundColor: '#040147'}} key={ele.id + ele.name} value={ele.id}><Typography style={{ color: '#ffffff' }}>{ele.name}</Typography></MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default TaskerGroups