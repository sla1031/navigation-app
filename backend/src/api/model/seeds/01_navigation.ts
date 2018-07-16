import * as Knex from 'knex';

export function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('navigation').del()
    .then(() => {
      // Inserts seed entries
      return knex('navigation').insert([
        {
          name: 'local',
          max_length: 5,
        },
        {
          name: 'global',
          max_length: 10,
        },
        {
          name: 'hamburger',
          max_length: 20,
          has_image: true,
        },
      ]);
    });
}
