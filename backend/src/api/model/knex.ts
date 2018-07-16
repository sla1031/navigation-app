import * as knex from 'knex';

const config = require('../../../knexfile');

export default knex(config[process.env.NODE_ENV || 'development']);
