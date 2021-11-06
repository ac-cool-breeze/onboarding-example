import React, { useEffect, useState } from 'react';
import { Paper, Typography, makeStyles, Grid, Button, Checkbox } from '@material-ui/core'
import AllGroups from './AllGroups';


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
        padding: '5px',
        textAlign: 'center',
        margin: '10px',
        minWidth: '25vw'
    },
});


const ArchiveTaskerGroup=()=>{
    const classes = useStyles();
    const [ archived, setArchived ] = useState(false)
    const [ newArchiveStatus, setNewArchiveStatus ] = useState()
    const [ selectedGroupId, setSelectedGroupId ] = useState('')

    const getArchived = async ()=>{
        let response = await fetch(`https://sdi05-03.staging.dso.mil/api/groups/isarchived?id=${selectedGroupId}`)
        let data = await response.json()
        setArchived(data.archived)
        console.log('getAchived', data.archived)
    }

    useEffect(()=>{
        getArchived()
    },[selectedGroupId])

    
    const handleClick=(e)=>{
        let reqOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ group_id : selectedGroupId, archived: newArchiveStatus })
        }

        fetch(`https://sdi05-03.staging.dso.mil/groups/archive`, reqOptions)
    }

    const handleChange=(e)=>{
        setArchived(!archived)
        setNewArchiveStatus(e.target.checked)
    }

    return(
    <>
        <Paper className={classes.paper}>
            <Typography variant="h5">Archive a tasker group</Typography>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item sm={3}><AllGroups setSelectedGroupId={setSelectedGroupId} /></Grid>
                <Grid item sm={8}>
                    <Checkbox checked={archived} onChange={handleChange} name="checked" defaultValue={archived} />
                    Archived
                </Grid>
                </Grid>
                <Grid item sm={12}><Button variant='contained' color='primary' onClick={handleClick}>Set Archive Status</Button></Grid>
            </Typography>
        </Paper>
    </>
    )
}

export default ArchiveTaskerGroup