import * as express from 'express';

import { getNavigations, getNavigationById, updateNavigation } from '../controllers/navigation';
import { convertToCamelCase, convertSingleToUnderscore } from '../../util';

export const navigationRouter: express.Router = express.Router();

navigationRouter.get('/', (req: express.Request, res: express.Response) => {
  getNavigations().then((navs) => {
    res.send(convertToCamelCase(navs));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});

navigationRouter.get('/:id', (req: express.Request, res: express.Response) => {
  getNavigationById(req.params.id).then((navs) => {
    res.send(convertToCamelCase(navs));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});

navigationRouter.patch('/:id', (req: express.Request, res: express.Response) => {
  const navigation = convertSingleToUnderscore(req.body);
  updateNavigation(req.params.id, navigation).then((navs) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(navs));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});
