import * as express from 'express';
import { assign } from 'lodash';

import * as linkController from '../controllers/link';
import { convertToCamelCase, convertSingleToUnderscore } from '../../util';

export const linkRouter: express.Router = express.Router();

linkRouter.get('/', (req: express.Request, res: express.Response) => {
  linkController.getLinks().then((links) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  });
});

linkRouter.get('/:id', (req: express.Request, res: express.Response) => {
  linkController.getLinkByID(req.params.id).then((links) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  });
});

linkRouter.post('/', (req: express.Request, res: express.Response) => {
  const link = convertSingleToUnderscore(assign({}, req.body));
  linkController.newLink(link).then((createdlink) => {
    res.statusCode = 201;
    res.send(convertToCamelCase(createdlink));
  });
});

linkRouter.patch('/:id', (req: express.Request, res: express.Response) => {
  const link = convertSingleToUnderscore(assign({}, req.body));
  linkController.updateLink(req.params.id, link).then((links) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  });
});

linkRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  linkController.deleteLink(req.params.id).then(() => {
    res.statusCode = 200;
    res.send();
  });
});
