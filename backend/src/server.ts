require('dotenv').config();

import * as express from 'express';
import * as parser from 'body-parser';
import * as cors from 'cors';

import { navigationRouter } from './api/routes/navigation';
import { linkRouter } from './api/routes/link';

const app: express.Express = express();
const port: number = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use('/navigation', navigationRouter);
app.use('/link', linkRouter);

app.listen(port, () => {
  console.log('server started on: ' + port);
});
