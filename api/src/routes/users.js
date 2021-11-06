let express = require('express')
let router = express.Router()
const knex = require('knex')(require('../../knexfile.js')['production'])

router.use(express.json())

/*
 Assigning a user to a group:
  User will get a group id column
  When user is assigned new group:
    Delete all instances of that user's id from users_taskers table
    Get all taskers assigned to new user group
    Add all information about taskers to users_taskers table
*/


router.get('/user', function (req, res) {
  if (req.query.name) {
    knex
      .select('id')
      .from('users')
      .where('user_name', req.query.name)
      .then(data => {
        //console.log(data[0].id)
        if (data.length > 0) {
          //console.log('inside')
          res.status(200).json({ id: data[0].id })
        } else {
          res.status(404).json({
            message:
              'No user found'
          })
        }
      })
  } else {
    res.status(404).json({
      message:
        'No user provided'
    })
  }
})

router.get('/users', function (req, res) {
  knex
    .select('user_name')
    .from('users')
    .then(data => res.status(200).json(data))
})

router.get('/getRole/:name', (req, res) => {
  knex.select('roles.rolename')
    .from('roles')
    .join('users', 'roles.id', 'users.roles_id')
    .where('users.user_name', `${req.params.name}`)
    .then(data => res.status(200).json(data))
    .catch(err => req.status(400).json(err))
})

router.post('/login', function (req, res) {
  knex
    .select('password')
    .from('users')
    .where('user_name', req.body.name)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message:
            'Incorrect username/password'
        })
      }
      else if (data[0].password === req.body.password) {
        res.status(200).json({
          message: 'Correct Combonation',
          name: `${req.body.name}`
        })
      } else {
        res.status(404).json({
          message:
            'Incorrect username/password'
        })
      }
    })
})

router.post('/new_user', function (req, res) {
  const {user_name, password, role} = req.body
  if (password.length < 5) {
    res.status(400).json({
      message:
        'password too short'
    })
  } else {
    knex('users')
      .insert({
        user_name: user_name,
        password: password,
        roles_id: role
      })
      .then(data => {
        res.status(201).json({
          message:
            'user created'
        })
      })
      .catch(err => res.status(400).json({
        message:
          'Cannot create user'
      }))
  }
})


router.delete('/user', function (req, res) {
  knex('users')
    .where('user_name', req.body.name)
    .del()
    .then(data => res.status(200).json({
      message:
        'user deleted'
    }))
})

router.patch('/updaterole', (req, res) => {
  knex('users')
    .where('user_name', req.body.name)
    .update('roles_id', req.body.newRole)
    .then(data => res.status(200).json({ message: 'user updated' }))
})

router.get('/gettasks', (req, res) => {
  // knex('users_taskers')
  //   .join('taskers', 'users_taskers.taskers_id', '=', 'taskers.id')
  //   .select('users_taskers.is_complete', 'users_taskers.id', 'taskers.task_name', 'taskers.task_description', 'users_taskers.due_date')
  //   .where('users_taskers.user_id', req.query.id)
    // .orderBy('users.taskers.id')
  knex.raw(`SELECT users_taskers.is_complete, users_taskers.id, taskers.task_name, taskers.task_description, users_taskers.due_date, users_taskers.taskers_id FROM users_taskers JOIN taskers ON users_taskers.taskers_id = taskers.id WHERE users_taskers.user_id = ${req.query.id} AND users_taskers.archived = false ORDER BY users_taskers.id`)
    .then(data => {
      console.log('logging data from /gettasks',data)
      return res.status(200).json(data.rows)
    })
    .catch(err => res.status(400).json({ message: 'no tasks' }))
})

router.patch('/complete', (req, res) => {

  // getting today in formatted date
  let today = new Date()  // today in the most verbose format
  let [ month, day, year ] = [ today.getMonth(), today.getDate(), today.getFullYear()] //  helper functions to get mm/dd/yyyy
  let todayFormatted = `${month+1}/${day}/${year}`


  knex('users_taskers')
    .where({ user_id: req.body.user_id, id: req.body.task_id })
    .update({is_complete: req.body.complete, completed_date: todayFormatted})
    .then(data => res.status(200).json({ message: 'task updated' }))
    .catch(err => res.status(400).json({ message: 'could not update' }))
})

router.patch('/uncomplete', (req, res) => {
  knex('users_taskers')
    .where({ user_id: req.body.user_id, id: req.body.task_id })
    .update({is_complete: req.body.complete, completed_date: 'not completed'})
    .then(data => res.status(200).json({ message: 'task updated' }))
    .catch(err => res.status(400).json({ message: 'could not update' }))
})

router.patch('/assigngroup', (req, res) => {
  knex('users')
    .where({ id: req.body.user_id })
    .update({ group_id: req.body.newGroup })
    // .then(fetch('http://localhost:8080/users/deletetasks', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(req.body)
    // }))
    .then(data => res.status(200).json({ message: 'tasks added' }))
    .catch(err => res.status(400).json({ message: 'could not update' }))
})

router.delete('/deletetasks', (req, res) => {
  knex.raw(`DELETE FROM users_taskers
    WHERE taskers_id NOT IN (
      SELECT id FROM taskers
      WHERE group_id = ${req.body.newGroup})
     AND user_id = ${req.body.user_id}`)
    .then(data => res.status(200).json({ message: 'tasks added' }))
    .catch(err => res.send(400).json({ message: 'could not update' }))
})

router.patch('/archivetask', (req, res) => {
  knex('users_taskers')
  .where('id', req.body.id)
  .update('archived', true)
  .then(data => res.status(200).json({ message: 'task updated' }))
  .catch(err => res.status(400).json({ message: 'could not update' }))
})

router.patch('/unarchivetask', (req, res) => {
  knex('users_taskers')
  .where('id', req.body.id)
  .update('archived', false)
  .then(data => res.status(200).json({ message: 'task updated' }))
  .catch(err => res.status(400).json({ message: 'could not update' }))
})

router.get('/groupmembership', (req, res) => {
  knex('groups')
    .join('users', 'users.group_id', 'groups.id')
    .select('groups.name')
    .where('users.id', req.query.id)
    .then(data => res.status(200).json(data[0]))
    .catch(err => res.send(400).json({ message: 'could not get group membership' }))
})

router.post('/addtasks', (req, res) => {
  return knex.select('taskers.id', 'taskers.time_to_complete')
    .from('taskers')
    .join('users', 'users.group_id', '=', 'taskers.group_id')
    .where('users.id', req.body.user_id)
    .then(data => {
      let insertArr = []


      for (let i = 0; i < data.length; i++) {
        // getting start_date
        let today = new Date()  // today in the most verbose format
        let [ month, day, year ] = [ today.getMonth(), today.getDate(), today.getFullYear()] //  helper functions to get mm/dd/yyyy
        let startDate = `${month+1}/${day}/${year}`
        let currentDays = today.getDate()
        let dueDate = new Date(today.setDate(currentDays+data[i].time_to_complete))
        let [ dueMonth, dueDay, dueYear ] = [dueDate.getMonth(), dueDate.getDate(), dueDate.getFullYear()]
        let dueDateJoined = `${dueMonth+1}/${dueDay}/${dueYear}`
        insertArr.push({ user_id: req.body.user_id, taskers_id: data[i].id, is_complete: 'false', due_date: dueDateJoined, start_date: startDate, completed_date: 'not completed' })
      }
      return knex('users_taskers')
        .insert(insertArr)
        .then(data => res.status(200).json({ message: 'tasks added' }))
        .catch(err => res.send(400).json({ message: 'could not update' }))
    })
})


router.post('/adddependacies', (req,res) => {


  console.log('add dependacies route hit')

  // getting today in formatted date
  let today = new Date()  // today in the most verbose format
  let [ month, day, year ] = [ today.getMonth(), today.getDate(), today.getFullYear()] //  helper functions to get mm/dd/yyyy
  let todayFormatted = `${month+1}/${day}/${year}`

  // complete all tasks + archive all tasks
  knex('users_taskers')
  .where('user_id', req.body.user_id)
  //.where('is_complete', 'false')
  .andWhere('archived',false)
  .update({
    archived: true
  })
  //.update('is_complete', 'true')
  //.update('completed_date', todayFormatted )
  //.update('archived', true)
  // get user group
  .then( dataa => {
    console.log('logging dataa:', dataa)
    knex('users')
    .select('group_id')
    .where('id', req.body.user_id )
    .then( userGroupId => {
      console.log('logging userGroupId:',userGroupId)
      // check if there is a dependacy
      knex('group_dependacies')
      .select('successor_group_id')
      .where('predecessor_group_id', userGroupId[0].group_id )
      .then( response => {
        console.log('res from depend lookup', response)
        // if a dependacy assign group
        if( response.length > 0){
          knex('users')
          .update('group_id', response[0].successor_group_id)
          .where('id', req.body.user_id)
          // assign new tasks based on group
          .then( response => {
            console.log('logging response from assigning new group:', response)
            knex.select('taskers.id', 'taskers.time_to_complete')
            .from('taskers')
            .join('users', 'users.group_id', '=', 'taskers.group_id')
            .where('users.id', req.body.user_id)
            .then(data => {
              console.log('logging taskers build out :', data)
              let insertArr = []

              for (let i = 0; i < data.length; i++) {
                // getting start_date
                let today = new Date()  // today in the most verbose format
                let [ month, day, year ] = [ today.getMonth(), today.getDate(), today.getFullYear()] //  helper functions to get mm/dd/yyyy
                let startDate = `${month+1}/${day}/${year}`
                let currentDays = today.getDate()
                let dueDate = new Date(today.setDate(currentDays+data[i].time_to_complete))
                let [ dueMonth, dueDay, dueYear ] = [dueDate.getMonth(), dueDate.getDate(), dueDate.getFullYear()]
                let dueDateJoined = `${dueMonth+1}/${dueDay}/${dueYear}`
                insertArr.push({ user_id: req.body.user_id, taskers_id: data[i].id, is_complete: 'false', due_date: dueDateJoined, start_date: startDate, completed_date: 'not completed' })
              }
              return knex('users_taskers')
                .insert(insertArr)
                .then(data => res.status(200).json({ message: 'new group tasks added' }))
                .catch(err => res.send(400).json({ message: 'could not update' }))
            })

          })
        } else if( response.length === 0){
          // else return status
          res.status(200).json({ message: 'all tasks marked complete!' })
        }
      })
    })
  })
  .catch(err => res.send(400).json({ message: 'could not update' }))
})

router.patch('/changepassword', (req, res) => {
  const { user_name, current_password, new_password } = req.body
  knex("users")
    .where('user_name', user_name)
    .andWhere('password', current_password)
    .update('password', new_password)
    .then(data => {
      if (data) {
        res.status(200).json({ message: 'updated successfully' })
      } else {
        res.status(400).json({ message: 'please enter a valid username/password' })
      }
    })
    .catch(err => res.status(400).json({ message: err }))
})

router.get('/allusers', (req, res) => {
  knex('users')
    .select('id', 'user_name', 'roles_id', 'group_id')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({ message: `Could not get users:${err}` }))
})

function addTask(user_id, task_id) {
}


router.get('/currentoverdue', (req,res) => {

  const compareDate=(value)=>{
    console.log('value', value.due_date)
    let today = new Date()
    let todayValue = today.valueOf()

    let due = new Date(value.due_date)
    let dueValue = due.valueOf()
    return todayValue > dueValue
  }

  knex('users_taskers')
  .join('users', 'users_taskers.user_id','=','users.id')
  .select('*')
  .where('is_complete','false')
  .then( res => {
    return res.filter( compareDate )
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send({ message: 'could not update' }))

})

// .whereNotIn('taskers_id', idArray)
// knex.select('id')
//   .from('taskers')
//   .where('group_id', req.body.newGroup)
//   .then(data => {
//     console.log(idArray)
//     return data.map(row => {
//       //console.log(row.id)
//       return row.id
//     })
//   }))
// .andWhere({ user_id: req.body.user_id })
// .del()

// knex.select('taskers.id')
//   .from('taskers')
//   .join('users', 'users.group_id', '=', 'taskers.group_id')
//   .where('users.id', req.body.user_id)
//   .then(data => {
//     // console.log(data)
//     data.map((row, index) => {
//       // console.log(row)
//       return knex('users_taskers')
//         .insert({ user_id: req.body.user_id, taskers_id: row.id, is_complete: 'false', due_date: '10/15/2022', start_date: '09/15/2022', completed_date: 'none' })
//     })
//   })

module.exports = router

// onboarding_checklist=# SELECT users.id, taskers.id FROM users
// onboarding_checklist-# INNER JOIN taskers ON taskers.group_id = users.group_id
// onboarding_checklist-# where users.id = 1;

// id | id
// ----+----
//   1 |  3
//   1 |  4
