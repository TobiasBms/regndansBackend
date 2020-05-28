exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('draw').del()
    .then(function () {
      // Inserts seed entries
      return knex('draw').insert([
        {drawId: 1, drawJson: 'test', createAt: new Date(), updatedAt: new Date()},
        {drawId: 2, drawJson: 'test 2', createAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
      ]);
    });
};
