import * as Knex from 'knex';

const procedure = `CREATE OR REPLACE FUNCTION hasImageUpdate()
RETURNS trigger AS
	$body$
		DECLARE
			hasImage boolean;
		BEGIN
			EXECUTE 'SELECT has_image FROM navigation_type WHERE name = $1' into hasImage USING NEW.navigation_type;

			IF hasImage = FALSE THEN
				EXECUTE 'UPDATE link SET image_url = null where navigation = $1' USING NEW.id;
			END IF;

			RETURN NEW;
		END;
	$body$
		LANGUAGE plpgsql
`;

const trigger = `CREATE TRIGGER hasImageUpdateTrigger AFTER UPDATE OF "navigation_type" ON navigation
	FOR EACH ROW EXECUTE PROCEDURE hasImageUpdate()
`;

const dropTrigger = `drop TRIGGER hasImageUpdateTrigger on navigation`;
const dropProcedure = `drop function hasImageUpdate`;

export function up(knex: Knex): Promise<any> {
  return knex.schema.raw(procedure).raw(trigger);
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.raw(dropTrigger).raw(dropProcedure);
}
