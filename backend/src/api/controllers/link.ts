import knex from '../model/knex';

type link = {
  title?: string;
  link_url?: string;
  image_url?: string;
  order?: number;
  navigation_name?: string;
};

export function getLinksByNavigation(navigation: string) {
  return knex('link').select().where({ navigation_name: navigation }).orderBy('order');
}

export function getLinkByID(id: number) {
  return knex('link').select().where({ id });
}

export function getLinks() {
  return knex('link').select().orderBy('navigation_name', 'order');
}

export function updateLink(id: number, updatedLink: link) {
  return knex('link').where('id', id).update(updatedLink).returning('*');
}
export function newLink(link: link) {
  return knex('link').insert(link).returning('*');
}

export function deleteLink(id: number) {
  return knex('link').where('id', id).delete();
}
