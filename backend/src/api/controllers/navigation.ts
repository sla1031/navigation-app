import knex from '../model/knex';

type navigation = {
  navigation_type: string;
};

export function getNavigations() {
  return knex('navigation').select().orderBy('id');
}

export function getNavigationById(id: string) {
  return knex('navigation').where({ id });
}

export function updateNavigation(id: string, updatedNav: navigation) {
  return knex('navigation').where('id', id).update(updatedNav).returning('*');
}
