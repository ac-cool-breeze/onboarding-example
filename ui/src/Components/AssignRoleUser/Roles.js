import React, { useEffect } from 'react';
import { FormControl, Select, MenuItem, FormHelperText, makeStyles, Typography } from "@material-ui/core"
import { useState } from 'react';

const apiUrl = `https://sdi05-03.staging.dso.mil/api/roles/allroles`

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: '5px',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: '10px',
    },
  }));


  const Roles =({ setSelectedRoleId })=>{
    const classes = useStyles();
    const [ roleId, setRoleId ] = useState('');
    const [ roleList, setRoleList ] = useState(['Loading...'])

    const getGroups= async ()=>{
        let response = await fetch(apiUrl)
        let data = await response.json()
        setRoleList(data)
    }

    const handleChange = (event) => {
        setRoleId(event.target.value);
        setSelectedRoleId(event.target.value)
    };

    useEffect(()=>{
        getGroups()
    },[])

    return(
        <FormControl error className={classes.formControl}>
        <Select
          value={roleId}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
        <MenuItem style={{ backgroundColor: '#040147'}} value=""><Typography style={{ color: '#ffffff' }}><em>None</em></Typography></MenuItem>
        { roleList.map( ele => {
            return <MenuItem style={{ backgroundColor: '#040147'}} key={ele.id+ele.rolename} value={ele.id}><Typography style={{ color: '#ffffff' }}>{ele.rolename}</Typography></MenuItem>
        })}
        </Select>
      </FormControl>
    )
}

export default Roles