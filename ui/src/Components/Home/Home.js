import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import MyAccount from '../MyAccount/MyAccount'
import RemoveUser from '../RemoveUser/RemoveUser';
import AssignTaskerGroup from '../AssignTaskerGroupUser/AssignTaskerGroupUser';
import AssignTaskGroup from '../AssignTaskGroup/AssignTaskGroup';
import CreateTaskerGroup from '../CreateTaskerGroup/CreateTaskerGroup';
import ArchiveTaskerGroup from '../ArchiveTaskerGroup/ArchiveTaskerGroup';
import CreateTask from '../CreateTask/CreateTask';
import AssignRoleUser from '../AssignRoleUser/AssignRoleUser'
import CreateUser from '../CreateUser/CreateUser'
import CreateRole from '../CreateRole/CreateRole';
import TaskList from '../TaskList/TaskList'
import EditTask from '../EditTask/EditTask'
import Dashboard from '../Charts/Dashboard'
import AdminTaskList from '../AdminTaskList/AdminTaskList'
import './Home.css'

const apiUrl = 'https://sdi05-03.staging.dso.mil/api';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: '10px',
    backgroundColor: '#05008f',
    color: '#ffffff',
    borderRadius: '20px',
    margin: '15px'
  },
  link: {
    textDecoration: 'inherit',
    color: 'inherit',
    padding: '5px',
  }
});


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


export default function Home({ setIsAuth, appUsername }) {

  console.log('home.js appusername:', appUsername)

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('onboarding');
  const anchorRef = React.useRef(null);


  let url = `${apiUrl}/roles/role?name=${appUsername}`

  const userRole = () => {

    fetch(url)
      .then(res => res.json())
      .then(data => setRole(data.rolename))

    if (role === 'onboarding') {
      return (
        <>
          <Link className={classes.link} className={classes.link} to="/task-list" ><StyledMenuItem>My Taskers</StyledMenuItem></Link>
        </>
      )
    } else if (role === 'facilitator') {
      return (
        <>
          <Link className={classes.link} to="/admin-task-list"><StyledMenuItem>Task List</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-task" ><StyledMenuItem>Create Task</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-task-group"><StyledMenuItem>Create Tasker Group</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-task-to-group"><StyledMenuItem>Assign Task to Group</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-group-to-user"><StyledMenuItem className="Create-Task">Assign Tasker Group to User</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-role-to-user"><StyledMenuItem>Assign Role to User</StyledMenuItem></Link>
          <Link className={classes.link} to="/dashboard"><StyledMenuItem>Dashboard</StyledMenuItem></Link>
        </>
      )
    } else if (role === 'admin') {
      return (
        <>
          <Link className={classes.link} to="/admin-task-list"><StyledMenuItem>Task List</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-task"><StyledMenuItem>Create Task</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-task-group"><StyledMenuItem>Create Tasker Group</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-task-to-group"><StyledMenuItem>Assign Task to Group</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-group-to-user"><StyledMenuItem>Assign Tasker Group to User</StyledMenuItem></Link>
          <Link className={classes.link} to="/assign-role-to-user"><StyledMenuItem>Assign role to User</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-user"><StyledMenuItem>Create User</StyledMenuItem></Link>
          <Link className={classes.link} to="/create-role"><StyledMenuItem>Create Role</StyledMenuItem></Link>
          <Link className={classes.link} to="/remove-user"><StyledMenuItem>Remove User</StyledMenuItem></Link>
          <Link className={classes.link} to="/dashboard"><StyledMenuItem>Dashboard</StyledMenuItem></Link>
        </>
      )
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault()
    setIsAuth(false)
    window.location.assign("https://sdi05-03.staging.dso.mil/")
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Router>
        <Paper className={classes.paper}>
          <MenuList>
            {userRole()}
            <Link className={classes.link} to="/my-account"><StyledMenuItem>My Account</StyledMenuItem></Link>
            <StyledMenuItem className="Logout" onClick={handleLogout}>Logout</StyledMenuItem>
          </MenuList>
        </Paper>
        <Switch>
          <Route path='/task-list'><TaskList appUsername={appUsername}></TaskList></Route>
          <Route path='/my-account'><MyAccount appUsername={appUsername}></MyAccount></Route>
          <Route path='/admin-task-list' component={AdminTaskList} />
          <Route path='/assign-role-to-user' component={AssignRoleUser} />
          <Route path='/create-task' component={CreateTask} />
          <Route path='/create-task-group' component={CreateTaskerGroup} />
          <Route path='/archive-task-group' component={ArchiveTaskerGroup} />
          <Route path='/assign-task-to-group' component={AssignTaskGroup} />
          <Route path='/assign-group-to-user' component={AssignTaskerGroup} />
          <Route path='/create-user' component={CreateUser} />
          <Route path='/create-role' component={CreateRole} />
          <Route path='/remove-user' component={RemoveUser} />
          <Route path='/edit-task' component={EditTask} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>

  );
}
