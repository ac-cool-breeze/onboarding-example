
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_name: 'test-facilitator', password: 'password', roles_id: 2 },
        { user_name: 'test-admin', password: 'password', roles_id: 3 },
        { user_name: 'developer', password: 'password', roles_id: 4 },
        {
          user_name: "Fabian",
          password: "Weissnat",
          roles_id: 1,
          group_id: 4
        },
        {
          user_name: "Lincoln",
          password: "Crona",
          roles_id: 1,
          group_id: 4
        },
        {
          user_name: "Kameron",
          password: "Fritsch",
          roles_id: 1,
          group_id: 3
        },
        {
          user_name: "Elizabeth",
          password: "Heidenreich",
          roles_id: 1,
          group_id: 2
        },
        {
          user_name: "Haylee",
          password: "Spinka",
          roles_id: 1,
          group_id: 2
        },
        {
          user_name: "Serena",
          password: "D'Amore",
          roles_id: 1,
          group_id: 2
        },
        {
          user_name: "Vita",
          password: "Franecki",
          roles_id: 1,
          group_id: 1
        },
        {
          user_name: "Emery",
          password: "Beatty",
          roles_id: 1,
          group_id: 1
        },
        {
          user_name: "Leonard",
          password: "Schinner",
          roles_id: 1,
          group_id: 1
        },
        {
          user_name: "Quinn",
          password: "Tremblay",
          roles_id: 1,
          group_id: 1
        },
        {
          user_name: "Robby",
          password: "Donaldson",
          roles_id: 1,
          group_id: 2
        },
        {
          user_name: "Jem",
          password: "Crawford",
          roles_id: 1,
          group_id: 1
        },



      ]);
    })
    .then(function () {
      return knex('roles')
        .insert([
          { rolename: 'onboarding' },
          { rolename: 'facilitator' },
          { rolename: 'admin' },
          { rolename: 'developer' }
        ])
    })
    .then(function () {
      return knex('taskers')
        .insert([
          { task_name: 'Sign in', task_description: 'Sign into website for first time.', time_to_complete: 7, group_id: 1 },
          { task_name: 'do something', task_description: 'Do a thing for the first time', time_to_complete: 7, group_id: 1 },
          { task_name: 'Get cleared', task_description: 'Get cleared hot to perform work duties', time_to_complete: 30, group_id: 2 },
          { task_name: 'Do Work', task_description: 'Do an official work task', time_to_complete: 30, group_id: 2 },
          { task_name: 'OJT', task_description: 'learn to do your job', time_to_complete: 30, group_id: 2 },
          { task_name: 'Work harder', task_description: 'Do a difficult work task', time_to_complete: 20, group_id: 3 },
          { task_name: 'Sign up', task_description: 'sign up for a thing', time_to_complete: 20, group_id: 3 },
          { task_name: 'Get account', task_description: 'get that account', time_to_complete: 20, group_id: 3 },
          { task_name: 'Get elevated acount', task_description: 'get that other account', time_to_complete: 45, group_id: 4 },
          { task_name: 'Supervise', task_description: 'pass down your knowledge', time_to_complete: 45, group_id: 4 },
          { task_name: 'Something cool', task_description: 'Do a cool thing', time_to_complete: 45, group_id: 4 },
          { task_name: 'Travel Training', task_description: 'Complete travel CBT.', time_to_complete: 60, group_id: 5 },
          { task_name: 'Outprocess', task_description: 'Schedule an outprocessing brief.', time_to_complete: 60, group_id: 5 },
          { task_name: 'Turn in equipment', task_description: 'Return equipment, retrieve hand receipt.', time_to_complete: 30, group_id: 6 },
          { task_name: 'Turn in badge', task_description: 'Return to security and hand over badge.', time_to_complete: 30, group_id: 6 },
          { task_name: 'Say Farewell', task_description: 'Say goodbye', time_to_complete: 1, group_id: 7 },
        ])
    })
    .then(function () {
      return knex('groups')
        .insert([
          { name: 'First Day', archived: false },
          { name: 'First Week', archived: false },
          { name: 'First 30 Days', archived: false },
          { name: 'First 60 Days', archived: false },
          { name: '60 Days Out', archived: false},
          { name: '30 Days Out', archived: false},
          { name: 'Final Out', archived: false},
        ])
    })
    .then(function () {
      return knex('users_taskers')
        .insert([
          // group 1, 7 days
          { user_id: 4, taskers_id: 1, is_complete: 'true', due_date: '05/23/2021', start_date: '05/16/2021', completed_date: '05/20/2021', archived: true },
          { user_id: 4, taskers_id: 2, is_complete: 'true', due_date: '05/23/2021', start_date: '05/16/2021', completed_date: '05/22/2021', archived: true },

          { user_id: 5, taskers_id: 1, is_complete: 'true', due_date: '05/26/2021', start_date: '05/19/2021', completed_date: '05/21/2021', archived: true },
          { user_id: 5, taskers_id: 2, is_complete: 'true', due_date: '05/26/2021', start_date: '05/19/2021', completed_date: '05/24/2021', archived: true },

          { user_id: 6, taskers_id: 1, is_complete: 'true', due_date: '06/16/2021', start_date: '06/09/2021', completed_date: '06/17/2021', archived: true },
          { user_id: 6, taskers_id: 2, is_complete: 'true', due_date: '06/16/2021', start_date: '06/09/2021', completed_date: '06/18/2021', archived: true },

          { user_id: 7, taskers_id: 1, is_complete: 'true', due_date: '07/13/2021', start_date: '07/6/2021', completed_date: '07/13/2021', archived: true },
          { user_id: 7, taskers_id: 2, is_complete: 'true', due_date: '07/13/2021', start_date: '07/6/2021', completed_date: '07/15/2021', archived: true },

          { user_id: 8, taskers_id: 1, is_complete: 'true', due_date: '07/17/2021', start_date: '07/10/2021', completed_date: '07/15/2021', archived: true },
          { user_id: 8, taskers_id: 2, is_complete: 'true', due_date: '07/17/2021', start_date: '07/10/2021', completed_date: '07/17/2021', archived: true },

          { user_id: 9, taskers_id: 1, is_complete: 'true', due_date: '07/19/2021', start_date: '07/12/2021', completed_date: '08/18/2021', archived: true },
          { user_id: 9, taskers_id: 2, is_complete: 'true', due_date: '07/19/2021', start_date: '07/12/2021', completed_date: '07/20/2021', archived: true },

          { user_id: 10, taskers_id: 1, is_complete: 'true', due_date: '08/01/2021', start_date: '07/25/2021', completed_date: '07/30/2021' },
          { user_id: 10, taskers_id: 2, is_complete: 'false', due_date: '08/01/2021', start_date: '07/25/2021', completed_date: 'not completed' },

          { user_id: 11, taskers_id: 1, is_complete: 'true', due_date: '08/01/2021', start_date: '07/25/2021', completed_date: '07/29/2021' },
          { user_id: 11, taskers_id: 2, is_complete: 'false', due_date: '08/01/2021', start_date: '07/25/2021', completed_date: 'not completed' },

          { user_id: 12, taskers_id: 1, is_complete: 'false', due_date: '08/02/2021', start_date: '07/26/2021', completed_date: 'not completed' },
          { user_id: 12, taskers_id: 2, is_complete: 'false', due_date: '08/02/2021', start_date: '07/26/2021', completed_date: 'not completed' },

          { user_id: 13, taskers_id: 1, is_complete: 'false', due_date: '08/03/2021', start_date: '07/27/2021', completed_date: 'not completed' },
          { user_id: 13, taskers_id: 2, is_complete: 'false', due_date: '08/03/2021', start_date: '07/27/2021', completed_date: 'not completed' },

          { user_id: 14, taskers_id: 1, is_complete: 'false', due_date: '05/17/2021', start_date: '05/10/2021', completed_date: '05/16/2021' },
          { user_id: 14, taskers_id: 2, is_complete: 'false', due_date: '05/17/2021', start_date: '05/10/2021', completed_date: '05/18/2021' },

          { user_id: 15, taskers_id: 1, is_complete: 'false', due_date: '07/27/2021', start_date: '07/20/2021', completed_date: 'not completed' },
          { user_id: 15, taskers_id: 2, is_complete: 'false', due_date: '07/27/2021', start_date: '07/20/2021', completed_date: 'not completed' },

          // Group 2, 30 days
          { user_id: 4, taskers_id: 3, is_complete: 'true', due_date: '06/21/2021', start_date: '05/22/2021', completed_date: '06/05/2021', archived: true },
          { user_id: 4, taskers_id: 4, is_complete: 'true', due_date: '06/21/2021', start_date: '05/22/2021', completed_date: '06/12/2021', archived: true },
          { user_id: 4, taskers_id: 5, is_complete: 'true', due_date: '06/21/2021', start_date: '05/22/2021', completed_date: '06/15/2021', archived: true },

          { user_id: 5, taskers_id: 3, is_complete: 'true', due_date: '06/23/2021', start_date: '05/24/2021', completed_date: '05/29/2021', archived: true },
          { user_id: 5, taskers_id: 4, is_complete: 'true', due_date: '06/23/2021', start_date: '05/24/2021', completed_date: '06/11/2021', archived: true },
          { user_id: 5, taskers_id: 5, is_complete: 'true', due_date: '06/23/2021', start_date: '05/24/2021', completed_date: '06/20/2021', archived: true },

          { user_id: 6, taskers_id: 3, is_complete: 'true', due_date: '07/18/2021', start_date: '06/18/2021', completed_date: '07/02/2021', archived: true },
          { user_id: 6, taskers_id: 4, is_complete: 'true', due_date: '07/18/2021', start_date: '06/18/2021', completed_date: '07/11/2021', archived: true },
          { user_id: 6, taskers_id: 5, is_complete: 'true', due_date: '07/18/2021', start_date: '06/18/2021', completed_date: '07/15/2021', archived: true },

          { user_id: 7, taskers_id: 3, is_complete: 'true', due_date: '08/14/2021', start_date: '07/15/2021', completed_date: '07/17/2021' },
          { user_id: 7, taskers_id: 4, is_complete: 'true', due_date: '08/14/2021', start_date: '07/15/2021', completed_date: '07/21/2021' },
          { user_id: 7, taskers_id: 5, is_complete: 'false', due_date: '08/14/2021', start_date: '07/15/2021', completed_date: 'not completed' },

          { user_id: 8, taskers_id: 3, is_complete: 'true', due_date: '08/16/2021', start_date: '07/17/2021', completed_date: '07/22/2021' },
          { user_id: 8, taskers_id: 4, is_complete: 'false', due_date: '08/16/2021', start_date: '07/17/2021', completed_date: 'not completed' },
          { user_id: 8, taskers_id: 5, is_complete: 'false', due_date: '08/16/2021', start_date: '07/17/2021', completed_date: 'not completed' },

          { user_id: 9, taskers_id: 3, is_complete: 'false', due_date: '08/19/2021', start_date: '07/20/2021', completed_date: 'not completed' },
          { user_id: 9, taskers_id: 4, is_complete: 'false', due_date: '08/19/2021', start_date: '07/20/2021', completed_date: 'not completed' },
          { user_id: 9, taskers_id: 5, is_complete: 'false', due_date: '08/19/2021', start_date: '07/20/2021', completed_date: 'not completed' },

          { user_id: 14, taskers_id: 3, is_complete: 'true', due_date: '06/17/2021', start_date: '05/18/2021', completed_date: '06/12/2021', archived: true },
          { user_id: 14, taskers_id: 4, is_complete: 'true', due_date: '06/17/2021', start_date: '05/18/2021', completed_date: 'not completed', archived: true },
          { user_id: 14, taskers_id: 5, is_complete: 'true', due_date: '06/17/2021', start_date: '05/18/2021', completed_date: 'not completed', archived: true },

          // group 3, 20 days
          { user_id: 4, taskers_id: 6, is_complete: 'true', due_date: '07/05/2021', start_date: '06/15/2021', completed_date: '06/20/2021', archived: true },
          { user_id: 4, taskers_id: 7, is_complete: 'true', due_date: '07/05/2021', start_date: '06/15/2021', completed_date: '06/24/2021', archived: true },
          { user_id: 4, taskers_id: 8, is_complete: 'true', due_date: '07/05/2021', start_date: '06/15/2021', completed_date: '07/01/2021', archived: true },

          { user_id: 5, taskers_id: 6, is_complete: 'true', due_date: '07/10/2021', start_date: '06/20/2021', completed_date: '06/25/2021', archived: true },
          { user_id: 5, taskers_id: 7, is_complete: 'true', due_date: '07/10/2021', start_date: '06/20/2021', completed_date: '07/01/2021', archived: true },
          { user_id: 5, taskers_id: 8, is_complete: 'true', due_date: '07/10/2021', start_date: '06/20/2021', completed_date: '07/04/2021', archived: true },

          { user_id: 6, taskers_id: 6, is_complete: 'false', due_date: '08/4/2021', start_date: '07/15/2021', completed_date: '07/22/2021' },
          { user_id: 6, taskers_id: 7, is_complete: 'false', due_date: '08/4/2021', start_date: '07/15/2021', completed_date: 'not completed' },
          { user_id: 6, taskers_id: 8, is_complete: 'false', due_date: '08/4/2021', start_date: '07/15/2021', completed_date: 'not completed' },

          // group 4, 45 days
          { user_id: 4, taskers_id: 9, is_complete: 'true', due_date: '08/15/2021', start_date: '07/01/2021', completed_date: '07/15/2021' },
          { user_id: 4, taskers_id: 10, is_complete: 'true', due_date: '08/15/2021', start_date: '07/01/2021', completed_date: '07/24/2021' },
          { user_id: 4, taskers_id: 11, is_complete: 'false', due_date: '08/15/2021', start_date: '07/01/2021', completed_date: 'not Completed' },

          { user_id: 5, taskers_id: 9, is_complete: 'true', due_date: '08/18/2021', start_date: '07/04/2021', completed_date: '07/20/2021' },
          { user_id: 5, taskers_id: 10, is_complete: 'false', due_date: '08/18/2021', start_date: '07/04/2021', completed_date: 'not completed' },
          { user_id: 5, taskers_id: 11, is_complete: 'false', due_date: '08/18/2021', start_date: '07/04/2021', completed_date: 'not completed' }
        ])
    })
    .then(function () {
  return knex('group_dependacies')
    .insert([
      { predecessor_group_id: 1, successor_group_id: 2 },
      { predecessor_group_id: 2, successor_group_id: 3 },
      { predecessor_group_id: 3, successor_group_id: 4 },
      { predecessor_group_id: 5, successor_group_id: 6 },
      { predecessor_group_id: 6, successor_group_id: 7 },
    ])
})

};


