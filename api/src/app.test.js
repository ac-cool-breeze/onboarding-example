var request = require('supertest');
describe('loading express', function () {

  var server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });

  describe('Index route', function () {
    it('responds to /', function testSlash(done) {
      request(server)
        .get('/')
        .expect(200, done)
    });


    it('404 everything else', function testPath(done) {
      request(server)
        .get('/foo/bar')
        .expect(404, done)
    });
  })


  describe('Users', function () {
    /*      SEEDED USERS:
        { user_name: 'test-user1', password: 'password'},
        { user_name: 'test-user2', password: 'password'},
        { user_name: 'test-user3', password: 'password'},
        { user_name: 'test-facilitator', password: 'password'},
        { user_name: 'test-admin', password: 'password'},
        { user_name: 'developer', password: 'password'}
    */

    // get - get a user role, returns role. TODO

    // get - get a user that exists
    it('checks that a user that exists', function testUserExists(done) {
      request(server)
        .get('/users/user?name=test-user1')
        .expect(200, { id: 1 }, done)
    })

    // get - get a user, doesnt exists, return bad status
    it('returns bad status when user doesnt exist', function textUserExists(done) {
      request(server)
        .get('/users/user?name=no-user')
        .expect(404, done)
    })

    // post - they send good user/pass, return good status, set session TODO: passports/session set
    it('checks for good username/password combo', function testPassword(done) {
      request(server)
        .post('/users/login')
        .send({ name: 'test-user1', password: 'password' })
        .expect(200, done)
    })

    // post - they send bad user... return bad status, redirect login TODO: passports/redirect
    it('checks for bad username combo', function testPassword(done) {
      request(server)
        .post('/users/login')
        .send({ name: 'no-user', password: 'password' })
        .expect(404, done)
    })

    // post - they send bad pass... return bad status, redirect login TODO: passports/redirect
    it('checks for bad password combo', function testPassword(done) {
      request(server)
        .post('/users/login')
        .send({ name: 'test-user1', password: 'passwo' })
        .expect(404, done)
    })

    // post - create user, they provide unique username, and good password, create user
    it('creates new user', function testCreate(done) {
      request(server)
        .post('/users/new_user')
        .send({ name: 'new_user', password: 'mypassword' })
        .expect(201, done)
    })

    // DELETE - delete a user, if provided a username
    it('deletes a user', function deleteUser(done) {
      request(server)
        .delete('/users/user')
        .send({ name: 'new_user' })
        .expect(200, done)
    })

    // post - create user, they provide a duplicate username, return bad status
    it('returns bad status when creating duplicate user', function checkUser(done) {
      request(server)
        .post('/users/new_user')
        .send({ name: 'test-user1', password: 'mypassword' })
        .expect(400, done)
    })

    // post - create user, they provide a bad password, return bad status
    it('returns bad status when creating duplicate user', function checkUser(done) {
      request(server)
        .post('/users/new_user')
        .send({ name: 'new-user', password: '' })
        .expect(400, done)
    })

    it('updates user role', function updateRole(done) {
      request(server)
        .patch('/users/updaterole')
        .send({ name: 'test-user1', newRole: 2 })
        .expect(200, done)

      request(server)
        .patch('/users/updaterole')
        .send({ name: 'test-user1', newRole: 1 })
        .expect(200, done)
    })

    it('should get all tasks assigned to user', function getTasks(done) {
      request(server)
        .get('/users/gettasks?id=1')
        .expect(200, { task_name: 'Sign in' }, done)
    })

    it('should set tasks to complete', function setComplete(done) {
      request(server)
        .patch('/users/complete')
        .send({ user_id: 1, task_id: 2, complete: 'true' })
        .expect(200, done)
    })

    it('should set tasks to not complete', function setIncomplete(done) {
      request(server)
      .patch('/users/complete')
      .send({ user_id: 1, task_id: 2, complete: 'false' })
      .expect(200, done)
    })

    it('should assign a user to a task group', function assignGroup(done) {
      request(server)
      .patch('/users/assigngroup')
      .send({user_id: 1, newGroup: 2})
      .expect(200, done)

      request(server)
      .delete('/users/deletetasks')
      .send({user_id: 1, newGroup: 2})
      .expect(200, done)

      request(server)
      .post('/users/addtasks')
      .send({user_id: 1})
      .expect(200, done)
    })
  })

  describe('Taskers', function () {
    it('should check that task exists', function checkTask(done) {
      request(server)
        .get('/taskers/task?name=do+something')
        .expect(200, { id: 2 }, done)
    })

    it('should get a list of all tasks and ids', function getList(done) {
      request(server)
      .get('/taskers/tasklist')
      .expect(200, done)
    })

    it('should create and delete a task', function createTask(done) {
      request(server)
        .post('/taskers/createtask')
        .send({
          task_name: 'newtask', task_description: 'this is a new task', time_to_complete: 7
        })
        .expect(200, done)

      request(server)
        .delete('/taskers/deletetask')
        .send({
          task_name: 'newtask'
        })
        .expect(200, done)
    })

    it('gets all tasks within group', function getGroupTasks(done) {
      request(server)
        .get('/taskers/grouptasks?id=1')
        .expect(200, { task_name: 'Sign in' }, done)
    })

    it('gets task group from task', function getTaskGroup(done) {
      request(server)
        .get('/taskers/taskgroup?name=Sign+in')
        .expect(200, { id: 1 }, done)
    })

    it('edits a task', function editTask(done) {
      request(server)
      .put('/taskers/edittask')
      .send({
        id: 1,
        task_name: 'Sign in again',
        task_description: 'Sign into website for second time.',
        time_to_complete: '6'
      })
      .expect(200, done)

      request(server)
      .put('/taskers/edittask')
      .send({
        id: 1,
        task_name: 'Sign in',
        task_description: 'Sign into website for first time.',
        time_to_complete: '7'
      })
      .expect(200, done)
    })

    it('assigns new group to a task', function assignGroup(done) {
      request(server)
      .patch('/taskers/assigngroup')
      .send({
        task_id: 4,
        group_id: 1
      })
      .expect(200, done)
    }
  )
});

  describe('Roles', function () {
    it('gets user role', function getRole(done) {
      request(server)
        .get('/roles/role?name=test-user1')
        .expect(200, { rolename: 'onboarding' }, done)
    })
  })

  describe('Groups', () => {
    it('should get a list of all groups and ids', function getList(done) {
      request(server)
      .get('/groups/grouplist')
      .expect(200, done)
    })
    
    it('Gets a count of users per group', function getUsersPerGroup(done) {
      request(server)
      .get('/groups/userspergroup')
      .expect(200, done)
    })
  })

})
