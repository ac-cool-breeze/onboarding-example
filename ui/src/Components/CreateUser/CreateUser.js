import React, { useEffect } from "react";
import "./CreateUser.css";
import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles, Paper } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  createUserForm: {
    display: "inline",
  },
  children: {
    margin: "10px",
  },

  formControl: {
    margin: "10px",
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
    textAlign: 'center',
    margin: '15px',
    minWidth: '25vw',
    flexGrow: 1,
    backgroundColor: '#05008f',
    color: '#ffffff',
    borderRadius: '20px'
  }
});


const CreateUser = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [roleList, setRoleList] = useState([]);
  const [role, setRole] = useState(0)

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://sdi05-03.staging.dso.mil/api/users/new_user`

    const postUserLogin = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: userName,
        password: password,
        role: role
      }),
    };

    fetch(url, postUserLogin)
      .then((res) => res.json())
      .then(json => alert(json.message))
      .catch(err => alert(err.message))
    // window.location.reload();
  }

  function getRoles() {
    fetch(`https://sdi05-03.staging.dso.mil/api/roles/allroles`)
      .then(res => res.json())
      .then(json => setRoleList(json))
  }


  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleRoleChange(e) {
    setRole(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <Paper className={classes.paper}>
      <form
        data-testid="createUserForm"
        className={classes.createUserForm}
        autoComplete="off"
      >
        <FormControl error id="create-user-form" className={classes.formControl}>
          <Typography>Enter username</Typography>
          <Input
            id="task-name"
            className={classes.children}
            onChange={handleUserName}
          />
          <Typography>Enter a new password</Typography>
          <Input
            type="password"
            id="task-name"
            className={classes.children}
            onChange={handlePassword}
          />
          <br />
          <Typography>Select a role</Typography>
          <Select
            labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
            onChange={handleRoleChange}
            value={role}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {roleList.map(role => <MenuItem value={role.id}>{role.rolename}</MenuItem>)}
          </Select>
        </FormControl>
        <br />
        <button className='button' onClick={handleSubmit}>
          <Typography>Create User</Typography>
        </button>
      </form>
    </Paper>
  );
};

export default CreateUser;
