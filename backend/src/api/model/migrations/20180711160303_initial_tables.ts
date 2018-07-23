import * as Knex from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('navigation_type', (table) => {
    table.string('name').primary();
    table.integer('max_length').defaultTo('10');
    table.integer('min_length').defaultTo('0');
    table.boolean('has_image').defaultTo(false);
  })
  .createTable('navigation', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('navigation_type').notNullable().references('name').inTable('navigation_type');
  })
  .createTable('link', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title', 45);
    table.uuid('navigation').notNullable().references('id').inTable('navigation');
    table.string('link_url');
    table.string('image_url');
    table.integer('sort');
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('navigation').dropTable('link').dropTable('navigation_type');
}
