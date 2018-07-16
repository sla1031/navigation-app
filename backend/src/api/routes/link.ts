import * as express from 'express';
import * as linkController from '../controllers/link';

export const linkRouter: express.Router = express.Router();

linkRouter.get('/', (req: express.Request, res: express.Response) => {
  linkController.getLinks().then((links) => {
    res.statusCode = 200;
    res.send(links);
  });
});

linkRouter.get('/:id', (req: express.Request, res: express.Response) => {
  linkController.getLinkByID(req.params.id).then((link) => {
    res.statusCode = 200;
    res.send(link);
  });
});

linkRouter.post('/', (req: express.Request, res: express.Response) => {
  linkController.newLink({
    title: req.body.title,
    link_url: req.body.link_url,
    image_url: req.body.image_url,
    navigation_name: req.body.navigation_name,
    order: req.body.order,
  }).then((createdlink) => {
    res.statusCode = 201;
    res.send(createdlink[0]);
  });
});

linkRouter.patch('/:id', (req: express.Request, res: express.Response) => {
  linkController.updateLink(req.params.id, {
    title: req.body.title,
    link_url: req.body.link_url,
    image_url: req.body.image_url,
    navigation_name: req.body.navigation_name,
    order: req.body.order,
  }).then((link) => {
    res.statusCode = 200;
    res.send(link);
  });
});

linkRouter.delete('/:id', (req: express.Request, res: express.Response) => {
  linkController.deleteLink(req.params.id).then(() => {
    res.statusCode = 200;
    res.send();
  });
});
