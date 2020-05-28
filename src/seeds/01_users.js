
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 2, username: 'testbruger2', email: 'testbruger2@somemail.com'},
        {id: 3, username: 'testbruger3', email: 'testbruger3@somemail.com'},
        {id: 4, username: 'testbruger4', email: 'testbruger4@somemail.com'},
        {id: 5, username: 'testbruger5', email: 'testbruger5@somemail.com'},
      ]);
    });
};
