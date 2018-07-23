import * as Knex from 'knex';

const procedure = `CREATE FUNCTION linkUpdateSort()
RETURNS trigger AS
	$body$
		DECLARE
			row RECORD;
			count BIGINT;
		BEGIN
			IF OLD.sort < NEW.sort THEN
				EXECUTE 'UPDATE link SET sort = sort - 1 where navigation = $1 AND sort <= $2 AND sort >= $3 AND id != $4' USING NEW.navigation, NEW.sort, OLD.sort, NEW.id;
			ELSE
				EXECUTE 'UPDATE link set sort = sort + 1 where navigation = $1 AND sort >= $2 AND sort <= $3 AND id != $4' USING NEW.navigation, NEW.sort, OLD.sort, NEW.id;
			END IF;
			RETURN NEW;
		END;
	$body$
		LANGUAGE plpgsql
`;

const trigger = `CREATE TRIGGER linkUpdateSortTrigger AFTER UPDATE OF "sort" ON link
	FOR EACH ROW
	WHEN (pg_trigger_depth() < 1)
	EXECUTE PROCEDURE linkUpdatesort()
`;

const dropTrigger = `drop TRIGGER linkUpdateSortTrigger on link`;
const dropProcedure = `drop function linkUpdateSortt`;

export function up(knex: Knex): Promise<any> {
  return knex.schema.raw(procedure).raw(trigger);
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.raw(dropTrigger).raw(dropProcedure);
}
