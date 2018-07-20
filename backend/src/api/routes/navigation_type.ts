import * as express from 'express';

import { getNavigationTypes, getNavigationTypeByName } from '../controllers/navigation_type';
import { convertToCamelCase } from '../../util';

export const navigationTypeRouter: express.Router = express.Router();

navigationTypeRouter.get('/', (req: express.Request, res: express.Response) => {
  getNavigationTypes().then((navs) => {
    res.send(convertToCamelCase(navs));
  });
});

navigationTypeRouter.get('/:name', (req: express.Request, res: express.Response) => {
  getNavigationTypeByName(req.params.name).then((navs) => {
    res.send(convertToCamelCase(navs));
  });
});
