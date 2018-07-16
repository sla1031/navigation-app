require('dotenv').config();

module.exports = {
  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/src/api/model/migrations',
    },
    seeds: {
      directory: __dirname + '/src/api/model/seeds',
    },
  },

};
