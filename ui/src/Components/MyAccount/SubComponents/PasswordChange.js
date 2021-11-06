import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Typography, makeStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import '../MyAccount.css'



function rand() {
 return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
 const top = 50 + rand();
 const left = 50 + rand();

 return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`,
 };
}

const useStyles = makeStyles((theme) => ({
 paper: {
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
 },
}));

export default function PasswordChange() {
 const classes = useStyles();
 const [modalStyle] = React.useState(getModalStyle);
 const [open, setOpen] = React.useState(false);
 const [username, setUsername] = useState('')
 const [currentPassword, setCurrentPassword] = useState('')
 const [newPassword, setNewPassword] = useState('')

 const url = `${process.env.APIURL}`

 const handleOpen = () => {
  setOpen(true);
 };

 const handleClose = () => {
  setOpen(false);
 };

 function handleSubmit() {
  fetch(`https://sdi05-03.staging.dso.mil/api/users/changepassword`, {
   method: 'PATCH',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    user_name: username,
    current_password: currentPassword,
    new_password: newPassword
   })
  })
   .then(res => res.json())
   .then(json => alert(json.message))
   .catch(err => alert(err.message))

  setUsername('')
  setCurrentPassword('')
  setNewPassword('')
  handleClose()
 }

 const body = (
  <div style={modalStyle} className={classes.paper}>
   <h2 id="simple-modal-title">Change Password</h2>
   <FormControl id="assign-tg-form" data-testid="AssignTaskGroupForm" className={classes.createTaskForm} autoComplete="off">
    <Typography>
     Enter username
    </Typography>
    <Input id="username" onChange={(e) => setUsername(e.target.value)} value={username} className={classes.children} />
    <br />
    <Typography>
     Enter current password
    </Typography>
    <Input id="cur-password" type="password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} className={classes.children} />
    <br />
    <Typography>
     Enter new password
    </Typography>
    <Input id="new-password" type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className={classes.children} />
    <br />
    <button className='button'>
     Change Password
    </button>
   </FormControl >
  </div>
 );

 return (
  <div>
   <button className='button' onClick={handleOpen}><Typography>Update Password</Typography></button>
   <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
   >
    {body}
   </Modal>
  </div>
 );
}