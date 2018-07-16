import knex from '../model/knex';

export function getNavigations() {
  return knex('navigation').select();
}

export function getNavigationByName(name: string) {
  return knex('navigation').where({ name });
}
