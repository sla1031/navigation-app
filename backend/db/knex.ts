import * as knex from 'knex';
import * as config from '../knexfile';

console.log(`config ${config}`);
export default knex(config['development']);
