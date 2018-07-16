import * as express from 'express';
import { getNavigations, getNavigationByName } from '../controllers/navigation';

export const navigationRouter: express.Router = express.Router();

navigationRouter.get('/', (req: express.Request, res: express.Response) => {
  getNavigations().then((nav) => {
    res.send(nav);
  });
});

navigationRouter.get('/:name', (req: express.Request, res: express.Response) => {
  getNavigationByName(req.params.name).then((nav) => {
    res.send(nav);
  });
});
