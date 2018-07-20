import * as Knex from 'knex';

exports.seed = function (knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('navigation').del()
    .then(() => {
      // Inserts seed entries
      return knex('navigation').insert([
        {
          navigation_type: 'local',
        },
      ]);
    });
};
