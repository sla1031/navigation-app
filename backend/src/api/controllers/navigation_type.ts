import knex from '../model/knex';

export function getNavigationTypes() {
  return knex('navigation_type').select().orderBy('name');
}

export function getNavigationTypeByName(name: string) {
  return knex('navigation_type').where({ name });
}
