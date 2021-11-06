import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import {
    makeStyles,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow
} from '@material-ui/core'
import GroupSelection from './GroupSelection'


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    flexParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
  
  function createData(user_name, tasks_completed, tasks_overdue) {
    return { user_name, tasks_completed, tasks_overdue };
  }
  
  const rows = [
    createData('Joe', 22, 2),
    createData('Jane', 23,1),
    createData('Eclair', 12, 0),
    createData('Cupcake', 3, 0),
    createData('Gingerbread', 15, 1),
  ];


const UserStatusView=()=>{
    const classes = useStyles();
    const [ selectedGroupId, setSelectedGroupId ] = useState(0)
    const [ rows, setRows ] = useState([])
    const [ data, setData ] = useState([{ user_name: 'Loading'}])

    const getTableData = async () => {
        let response = await fetch(`https://sdi05-03.staging.dso.mil/api/groups/groupperson?id=${selectedGroupId}`)
        let newData = await response.json()
        setData(newData)
    }

    useEffect(()=>{
        getTableData()
    },[selectedGroupId])

    return(
        <>
        <Paper>
            <Typography variant="h6" color="primary">User Status View</Typography>
            <div className={classes.flexParent}>
                <Typography variant="subtitle" color="primary" className={classes.flexChild}>Select a group:</Typography>
                <GroupSelection setSelectedGroupId={setSelectedGroupId}/>
            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="right">Tasks Completed</TableCell>
                    <TableCell align="right">Tasks Overdue</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                { 
                    data.map((row) => (
                        <TableRow key={row.user_name}>
                        <TableCell component="th" scope="row">{row.user_name}</TableCell>
                        <TableCell align="right">{row.tasks_completed}/{row.tasks_total_assigned}</TableCell>
                        <TableCell align="right">{row.tasks_overdue}</TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
        </>
    )
}


/*

rows.map((row) => (
                    <TableRow key={row.user_name}>
                    <TableCell component="th" scope="row">{row.user_name}</TableCell>
                    <TableCell align="right">{row.tasks_completed}</TableCell>
                    <TableCell align="right">{row.tasks_overdue}</TableCell>
                    </TableRow>
                ))

*/

export default UserStatusView