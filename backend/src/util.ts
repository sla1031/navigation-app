import { camelCase, mapKeys, snakeCase } from 'lodash';

export function convertToCamelCase(dbEntities: any[]): any {
  return dbEntities.map((entity: any) => {
    return mapKeys(entity, (value, key) => {
      return camelCase(key);
    });
  });
}

export function convertSingleToUnderscore(dbentity: any): any {
  return mapKeys(dbentity, (value, key) => {
    return snakeCase(key);
  });
}
