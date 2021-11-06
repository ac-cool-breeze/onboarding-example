import React, { useEffect } from 'react';
import { FormControl, Select, MenuItem, FormHelperText, makeStyles, Typography } from "@material-ui/core"
import { useState } from 'react';

const apiUrl = `https://sdi05-03.staging.dso.mil/api/users/allusers`

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: '5px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: '10px',
    },
  }));


  const Users =({ setSelectedUserName })=>{
    const classes = useStyles();
    const [ user, setUser ] = useState('');
    const [ groupList, setGroupList ] = useState(['Loading...'])

    const getGroups= async ()=>{
        let response = await fetch(apiUrl)
        let data = await response.json()
        setGroupList(data)
    }

    const handleChange = (event) => {
      setUser(event.target.value);
      setSelectedUserName(event.target.value)
    };

    useEffect(()=>{
        getGroups()
    },[])

    return(
        <FormControl error className={classes.formControl}>
        <Select
          value={user}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
        <MenuItem style={{ backgroundColor: '#040147'}} value=""><Typography style={{ color: '#ffffff' }}><em>None</em></Typography></MenuItem>
        { groupList.map( ele => {
            return <MenuItem style={{ backgroundColor: '#040147'}} key={`${ele.id} ${ele.name}`} value={ele.user_name}><Typography style={{ color: '#ffffff' }}>{ele.user_name}</Typography></MenuItem>
        })}
        </Select>
      </FormControl>
    )
}

export default Users