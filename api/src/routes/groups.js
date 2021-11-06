let express = require('express')
let router = express.Router()
const knex = require('knex')(require('../../knexfile.js')['production'])

router.use(express.json())

router.get('/groupname', function (req, res) {
    knex('groups')
        .select('name')
        .where('id', req.query.id)
        .then(data => {
            res.status(200)
                .json(data[0])
        }).catch(err => {
            res.status(400).send({ "message": `Error: ${err}` })
        })
})

router.get('/usergroup', (req, res) => {
    knex('users')
        .select('group_id')
        .where('id', req.query.id)
        .then(data => {
            res.status(200)
                .json(data[0])
        }).catch(err => {
            res.status(400)
                .send({ "message": `Error: ${err}` })
        })
})

router.get('/usergroupname', (req, res) => {
    knex('groups')
        .join('users', 'users.id', 'groups.id')
        .select('groups.name')
        .where('users.id', req.query.id)
        .then(data => {
            res.status(200)
                .json(data[0])
        }).catch(err => {
            res.status(400)
                .send({ "message": `Error: ${err}` })
        })
})


router.get('/grouplist', (req, res) => {
    knex.select('*')
        .from('groups')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ message: 'no groups found' }))
})

router.post('/creategroup', (req, res) => {
    knex('groups')
        .insert({ name: `${req.body.name}`, archived: false })
        .then(data => res.status(200).send('Group created.'))
        .catch(err => res.status(400).json({ message: `Error: ${err}` }))
})

router.get('/isarchived', (req, res) => {
    knex('groups')
        .select('archived')
        .where('id', req.query.id)
        .then(data => {
            res.status(200)
                .json(data[0])
        }).catch(err => {
            res.status(400)
                .send({ "message": `Error: ${err}` })
        })
})

router.patch('/archive', (req, res) => {
    const { group_id, archived } = req.body
    knex('groups')
        .where('id', group_id)
        .update('archived', archived)
        .then(data => res.status(200).json({ message: `updated group archival status` }))
        .catch(err => res.status(400).send({ message: `could not update: ${err}` }))
})

router.get('/userspergroup', (req, res) => {
    knex.raw('SELECT groups.id, groups.name, COUNT(users.user_name) FROM groups LEFT JOIN users ON groups.id = users.group_id GROUP BY groups.name, groups.id ORDER BY groups.id')
        .then(data => res.status(200).json(data.rows))
        .catch(err => res.status(400).json(err))
})

const compareDate=(value)=>{
    let today = new Date()
    let todayValue = today.valueOf()

    let due = new Date(value)
    let dueValue = due.valueOf()
    return todayValue > dueValue
  }

router.get('/groupperson', (req,res) => {
    
    let group_data = []
    let incGroupId = req.query.id


    knex('users_taskers')
    .join('taskers','users_taskers.taskers_id','taskers.id')
    .join('users','users_taskers.user_id','users.id')
    .select(
        'users.user_name',
        'taskers.*',
        'users_taskers.*',
        ).where('users_taskers.archived',false).where('taskers.group_id',incGroupId)
    .then( data => {
        data.forEach(element => {   // looping through each returned group of taskers assigned to users
            let inGroup = false
            group_data.forEach( (gdElement, index) => { // check if current element is already in group, eg. user has a task already assigned
                if(gdElement.user_id === element.user_id){  // found another entry, increment current gdElement data
                    inGroup = true
                    group_data[index].tasks_total_assigned++
                    if( element.is_complete === 'true'){  // increment completed tasks, if its done
                        group_data[index].tasks_completed++
                    }
                    if( element.completed_date != "not completed"){     // if not completed, check if overdue
                        current_element_overdue = compareDate(element.due_date)
                        group_data[index].tasks_overdue++
                    }
                }
                return inGroup
            })  
            if( !inGroup ){
                let overdue = compareDate(element.due_date)
                let completeAmount = 0
                if( element.is_complete === 'true'){
                    completeAmount = 1
                }
                if( overdue ){
                    overdue = 1
                } else {
                    overdue = 0
                }
                group_data.push({ 
                    user_id: element.user_id, 
                    user_name: element.user_name, 
                    tasks_completed: completeAmount,
                    tasks_total_assigned: 1,
                    tasks_overdue: overdue 
                })
            }
        });
        return group_data
    })
    .then(data => res.status(200).json(group_data))
    .catch(err => res.status(400).json(err))
})

module.exports = router
