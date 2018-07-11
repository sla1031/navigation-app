import * as express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

console.log('server started on: ' + port);
