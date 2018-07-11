import * as Knex from 'knex';

exports.seed = function (knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('navigation').del()
    .then(() => {
      // Inserts seed entries
      return knex('navigation').insert([
        {
          id: 1,
          name: 'Local',
          max_length: 5,
        },
        {
          id: 2,
          name: 'Global',
          max_length: 10,
        },
        {
          id: 3,
          name: 'Hamburger',
          max_length: 20,
          has_image: true,
        },
      ]);
    });
};
