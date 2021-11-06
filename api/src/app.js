const express = require('express');
const app = express();
const cors = require('cors');

let usersRouter = require('./routes/users')
let indexRouter = require('./routes/index')
let rolesRouter = require('./routes/roles')
let taskersRouter = require('./routes/taskers')
let groupsRouter = require('./routes/groups')

let corsOptions = {
    origin: 'https://sdi05-03.staging.dso.mil',
    credentials: 'true'
}

app.use(cors(corsOptions));
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/roles', rolesRouter)
app.use('/taskers', taskersRouter)
app.use('/groups', groupsRouter)

module.exports = app;