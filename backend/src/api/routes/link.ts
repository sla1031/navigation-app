import * as express from 'express';
import { assign } from 'lodash';

import * as linkController from '../controllers/link';
import { convertToCamelCase, convertSingleToUnderscore } from '../../util';

export const linkRouter: express.Router = express.Router();

linkRouter.get('/', (req: express.Request, res: express.Response) => {
  linkController.getLinks().then((links) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});

linkRouter.get('/:id', (req: express.Request, res: express.Response) => {
  linkController.getLinkByID(req.params.id).then((links) => {
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});

linkRouter.post('/', (req: express.Request, res: express.Response) => {
  const link = convertSingleToUnderscore(assign({}, req.body));
  linkController.newLink(link).then((createdlink) => {
    res.statusCode = 201;
    res.send(convertToCamelCase(createdlink));
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});

linkRouter.patch('/:id', (req: express.Request, res: express.Response) => {
  // tslint:disable-next-line
  console.log('patching link', req.params.id);
  const link = convertSingleToUnderscore(assign({}, req.body));
  linkController.updateLink(req.params.id, link).then((links) => {
    // tslint:disable-next-line
    console.log('200');
    res.statusCode = 200;
    res.send(convertToCamelCase(links));
  }).catch((err)  => {
    // tslint:disable-next-line
    console.log('500', err);
    res.statusCode = 500;
    res.send(err);
  });
});

linkRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  linkController.deleteLink(req.params.id).then(() => {
    res.statusCode = 200;
    res.send();
  }).catch((err)  => {
    res.statusCode = 500;
    res.send(err);
  });
});
