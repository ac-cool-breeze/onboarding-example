const { response } = require('express')
let express = require('express')
let router = express.Router()
const knex = require('knex')(require('../../knexfile.js')['production'])

router.use(express.json())

router.get('/task', (req, res) => {
  knex
    .select('id')
    .from('taskers')
    .where('task_name', req.query.name)
    .then(data => res.status(200).json({ id: data[0].id }))
    .catch(err => res.status(400).json({ message: 'no task found' }))
})

router.get('/tasklist', (req, res) => {
  knex.select('id', 'task_name', 'task_description', 'time_to_complete')
    .from('taskers')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json({ message: 'no tasks found' }))
})

router.get('/admintasklist', (req, res) => {
  knex.select('users_taskers.id', 'users.user_name', 'taskers.task_name', 'users_taskers.taskers_id', 'users_taskers.is_complete', 'users_taskers.due_date', 'users_taskers.archived', 'users_taskers.completed_date')
  .from('users_taskers')
  .join('users', 'users.id', '=', 'users_taskers.user_id')
  .join('taskers', 'taskers.id', '=', 'users_taskers.taskers_id')
  .orderBy('users_taskers.id', 'asc')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(200).json({ message: err }))
})

router.post('/createtask', (req, res) => {
  knex('taskers')
    .insert({ task_name: req.body.task_name, task_description: req.body.task_description, time_to_complete: req.body.time_to_complete })
    .then(date => res.status(200).json({ message: 'task created' }))
    .catch(err => res.status(400).json({ message: 'unable to create task' }))
})

router.delete('/deletetask', (req, res) => {
  knex('taskers')
    .where('task_name', req.body.task_name)
    .del()
    .then(data => res.status(200).json({ message: 'task deleted' }))
})

router.get('/grouptasks', (req, res) => {
  knex.select('task_name')
    .from('taskers')
    .where('group_id', req.query.id)
    .then(data => res.status(200).json({ task_name: data[0].task_name }))
})

router.get('/taskgroup', (req, res) => {
  knex.select('group_id')
    .from('taskers')
    .where('task_name', req.query.name)
    .then(data => res.status(200).json({ id: data[0].group_id }))
})

router.put('/edittask', (req, res) => {

  knex('taskers')
    .where('id', req.body.id)
    .update({
      task_name: `${req.body.task_name}`,
      task_description: `${req.body.task_description}`,
      time_to_complete: `${req.body.time_to_complete}`
    })
    .then(data => {
      if (data) {
        res.status(200).json({ message: 'edited successfully' })
      } else {
        res.status(400).json({ message: 'Could not update' })
      }
    })
    .catch(err => res.status(400).json({ message: `Unable to edit task: ${err}` }))

})

router.patch('/assigngroup', (req, res) => {
  const { task_id, group_id } = req.body
  knex('taskers')
    .where('id', task_id)
    .update('group_id', group_id)
    .then(data => res.status(200).json({ message: `updated group to ${group_id}` }))
    .catch(err => res.status(400).send({ message: 'could not update' }))
})

router.get('/currentoverdue', (req, res) => {

  const compareDate = (value) => {
    console.log('value', value.due_date)
    let today = new Date()
    let todayValue = today.valueOf()

    let due = new Date(value.due_date)
    let dueValue = due.valueOf()
    return todayValue > dueValue
  }

  knex('users_taskers')
    .select('*')
    .where('is_complete', 'false')
    .then(res => {
      return res.filter(compareDate)
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send({ message: 'could not update' }))

})

router.get('/avgtimetask', (req, res) => {

  knex('users_taskers')
    .join('taskers', 'users_taskers.taskers_id', 'taskers.id')
    .select('*')
    .where('users_taskers.is_complete', 'true')
    .where('users_taskers.id','<',6)
    .then(data => {
      let tempData = []
      data.forEach(element => {
        if (element.completed_date) {
          // Get value of start in ms
          let start = new Date(element.start_date)
          let startValue = start.valueOf()
          // Get value of completed in ms
          let completed = new Date(element.completed_date)
          let completedValue = completed.valueOf()
          // Get duration( compl - start) in seconds
          let durationInSeconds = ((completedValue - startValue) / 1000)
          // Turn into days
          let durationInDays = (durationInSeconds / 86400)
          // Start looping through to make return data
          if (tempData.length === 0) {
            tempData.push({ id: element.id, name: element.task_name, avg_duration: [durationInDays] })
          } else {
            let foundElement = false
            tempData.forEach((ele, index) => {
              if (ele.id === element.id) {
                tempData[index].avg_duration.push(durationInDays)
                foundElement = true
              }
            })
            if (!foundElement) {
              tempData.push({ id: element.id, name: element.task_name, avg_duration: [durationInDays] })
            }
          }
          console.log(tempData)
        }
      })

      // do average
      tempData.forEach(ele => {
        let count = ele.avg_duration.length
        let sum = ele.avg_duration.reduce((a, b) => a + b)
        console.log('sum', sum)
        ele.avg_duration = sum / count
      })

      console.log(tempData)

      return res.status(200).json(tempData)
    })
    .catch(err => res.status(400).send({ message: 'could not update' }))

})


router.get('/checklast',(req,res)=>{
  console.log('req.query',req.query)
  let user_id = req.query.user_id
  let task_id = req.query.task_id
  knex('taskers')
  .select('group_id')
  .where('id', task_id)
  .then( response =>{
    knex('taskers')
    .select('id')
    .where('group_id',response[0].group_id)
    .then( response => {
      return response.map(ele=>{
        return ele.id
      })
    })
    .then( response =>{
      knex('users_taskers')
      .select('id')
      .where('user_id', user_id)
      .where('is_complete','false')
      .whereIn('taskers_id',response)
      .then( data => {
        console.log(data.length)
        if(data.length === 1){
          res.status(200).send({ message: 'Last task to complete!'})
        } else {
          res.status(400).send({ message: 'There are more tasks to complete.'})
        }
      })
    })
  })
})

module.exports = router
