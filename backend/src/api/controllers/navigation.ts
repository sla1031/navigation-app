import knex from '../model/knex';

export function getNavigations() {
  return knex('navigation').select().orderBy('name');
}

export function getNavigationByName(name: string) {
  return knex('navigation').where({ name });
}
