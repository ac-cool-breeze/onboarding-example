import React from 'react';
import { Paper, makeStyles, Card, Grid } from '@material-ui/core';
import UserStatusView from '../UserStatusView/UserStatusView';
const { default: AvgTaskerTime } = require("./AvgTaskerTime")
const { default: UsersByGroups } = require("./UsersByGroup")
const { default: UsersMostDelays } = require("./UsersMostDelays")


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
      },
    paper: {
        padding: '15px',
        textAlign: 'center',
        margin: '15px',
        backgroundColor: '#05008f',
        color: '#ffffff'
    },
    card: {
        backgroundColor: '#ffffff',
        margin: '5px',
        padding: '5px'
    }
})

const Dashboard=()=>{
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={4}>
            <Card className={classes.card}>
                <UsersMostDelays />
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card}>
                <UsersByGroups />
            </Card>
            </Grid>
            <Grid item xs={4}>
            <Card className={classes.card}>
                <AvgTaskerTime />
            </Card>
            </Grid>
            <Grid item xs={12}>
                <UserStatusView />
            </Grid>
        </Grid>
        </Paper>
    )
}

export default Dashboard
