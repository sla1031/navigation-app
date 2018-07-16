import * as Knex from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('navigation', (table) => {
    table.string('name', 45).primary();
    table.integer('max_length').defaultTo('10');
    table.integer('min_length').defaultTo('0');
    table.boolean('has_image').defaultTo(false);
  })
  .createTable('link', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title', 45).notNullable();
    table.string('navigation_name', 45).notNullable().references('name').inTable('navigation');
    table.string('link_url');
    table.string('image_url');
    table.integer('order');
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('link').dropTable('navigation');
}
