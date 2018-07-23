import * as Knex from 'knex';

const procedure = `CREATE FUNCTION linkDeleteSort()
RETURNS trigger AS
	$body$
		DECLARE
			row RECORD;
			count BIGINT;

		BEGIN
			count = OLD.sort;
			FOR row in EXECUTE 'SELECT * from link where navigation = $1 and id != $2 and sort >= $3 ORDER BY sort' USING OLD.navigation, OLD.id, OLD.sort LOOP
				EXECUTE 'UPDATE link set sort = $1 WHERE id = $2' USING count, row.id;

				count = count + 1;
			END LOOP;
			RETURN OLD;
		END;
	$body$
		LANGUAGE plpgsql
`;

const trigger = `CREATE TRIGGER linkDeleteSortTrigger AFTER DELETE
	ON link
	FOR EACH ROW EXECUTE PROCEDURE linkDeleteSort()
`;

const dropTrigger = `drop TRIGGER linkDeleteSortTrigger on link`;
const dropProcedure = `drop function linkDeleteSort`;

export function up(knex: Knex): Promise<any> {
  return knex.schema.raw(procedure).raw(trigger);
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.raw(dropTrigger).raw(dropProcedure);
}
