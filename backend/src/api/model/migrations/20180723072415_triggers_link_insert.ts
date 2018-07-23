import * as Knex from 'knex';

const procedure = `CREATE FUNCTION linkInsertSort()
	RETURNS trigger AS
	$body$
		DECLARE
			count BIGINT;
      BEGIN
  			EXECUTE 'SELECT count(sort) FROM link WHERE navigation = $1' into count USING NEW.navigation;

  			IF count != 1 THEN
  				count = count + 1;
  			END IF;

  			EXECUTE 'UPDATE link set sort = $1 where id = $2' USING count, NEW.id;

  			RETURN NEW;
  		END;
	$body$

		LANGUAGE plpgsql
`;

const trigger = `CREATE TRIGGER linkInsertSortTrigger AFTER INSERT
	on link
	FOR EACH ROW
	EXECUTE PROCEDURE linkInsertsort()
`;

const dropTrigger = `drop TRIGGER linkInsertSortTrigger on link`;
const dropProcedure = `drop function linkInsertSort`;

export function up(knex: Knex): Promise<any> {
  return knex.schema.raw(procedure).raw(trigger);
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.raw(dropTrigger).raw(dropProcedure);
}
