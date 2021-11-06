import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState, useEffect } from 'react';

const CompletedList=({ open, setOpen, appUsername, update, setUpdate })=>{
    const [userId, setUserId] = useState(2)

    function getUserId() {
      fetch(`https://sdi05-03.staging.dso.mil/api/users/user?name=${appUsername}`)
        .then(res => res.json())
        .then(json => setUserId(json.id))
        .catch(err => console.log(err))
    }

    useEffect(() => {
      getUserId()
    }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCloseNo = () => {
      setOpen(false);
    };
  
    const handleCloseYes = () => {
      let url = `https://sdi05-03.staging.dso.mil/api/users/adddependacies`
      let reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      }

      fetch(url, reqOptions)
      .then(res=>{
        setUpdate(!update)
        return setOpen(false);
      })
    };

    return(
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Last task completed.
        </Button>
        <Dialog
          open={open}
          onClose={handleCloseNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Last task completed."}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to close this tasker group? You will be unable to return.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className='button' onClick={handleCloseNo}>No</button>
            <button className='button' onClick={handleCloseYes}>Yes, close group</button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default CompletedList
