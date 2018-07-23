# Navigation and Link Management App

## Database
A postgres database is needed with the extension 'uuid-ossp'.
```
$ psql
# \connect <databaseName>
# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Backend
### `.env` File
```
DB_NAME = ''
DB_HOST = ''
DB_PORT = ''
DB_USER = ''
DB_PASSWORD = ''
PORT = ''
```
When starting with a clean database, the script `setupDB` is available. This will run all the needed Knex migrations and seed files
```
$ yarn setupDB
```
The following command will start an express server on port 4000 if `PORT` is not set in `.env`
```
$ yarn start
```

## Frontend
### `.env` File
```
REACT_APP_API_URL = ''
```
The frontend is built using create-react-app and Typescript. The following create-react-app scripts are available
```
$ yarn start;
$ yarn build;
```
