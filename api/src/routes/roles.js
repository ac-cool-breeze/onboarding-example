let express = require('express')
let router = express.Router()
const knex = require('knex')(require('../../knexfile.js')['production'])

router.use(express.json())

// router.patch('/deleteroles', (req, res) => {
//   knex('users')
//   .where({'user_name': req.body.name})
//   .update({})
// })

router.get('/role', (req, res) => {
  // knex.select('roles.rolename')
  // .from('users', 'roles')
  // .where('users.roles_id', 'roles.id')
  // .andWhere('users.user_name', req.query.name)
  // knex('users')
  // .join('contacts', 'users.id', '=', 'contacts.user_id')
  // .select('users.id', 'contacts.phone')

  knex('roles')
    .join('users', 'users.roles_id', '=', 'roles.id')
    .select('roles.rolename')
    .where('users.user_name', req.query.name)
      .then(data => res.status(200).json({ rolename: data[0].rolename }))
      .catch(err => res.status(400).json({ message: 'no role found' }))
})

router.post('/newrole', (req, res) => {
  knex('roles')
    .insert({
      rolename: `${req.body.rolename}`
    })
    .then( data => res.status(200).json({ message: 'New role created'}))
    .catch(err => res.status(400).json({ message: `Unable to create role: ${err}` }))
})

router.get('/allroles', (req,res) =>{
  knex('roles')
  .select('*')
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json({ message: `Error: ${err}` }))
})

module.exports = router
