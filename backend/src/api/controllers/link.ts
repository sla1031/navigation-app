import knex from '../model/knex';

type link = {
  title?: string;
  link_url?: string;
  image_url?: string;
  sort?: number;
  navigation?: string;
};

export function getLinksByNavigation(navigation: string) {
  return knex('link').select().where({ navigation }).orderBy('sort');
}

export function getLinkByID(id: string) {
  return knex('link').select().where({ id });
}

export function getLinks() {
  return knex('link').select().orderBy('navigation', 'asc').orderBy('sort', 'asc');
}

export function updateLink(id: string, updatedLink: link) {
  return knex('link').where('id', id).update(updatedLink).returning('*');
}
export function newLink(link: link) {
  return knex('link').insert(link).returning('*');
}

export function deleteLink(id: string) {
  return knex('link').where('id', id).delete();
}
