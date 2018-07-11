import * as Knex from 'knex';

exports.up = function (knex: Knex): Promise<any> {
  return knex.schema.createTable('navigation', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('max_length').defaultTo('10');
    table.integer('min_length').defaultTo('0');
    table.boolean('has_image').defaultTo(false);
  })
  .createTable('link', (table) => {
    table.increments();
    table.string('link_title').notNullable();
    table.string('link_url').notNullable();
    table.integer('order');
    table.integer('navigation_id').references('id').inTable('navigation');
  });
};

exports.down = function (knex: Knex): Promise<any> {
  return knex.schema.dropTable('link').dropTable('navigation');
};
