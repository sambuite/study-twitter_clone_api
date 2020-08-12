import { Router } from 'express';

const routes = Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'Ok' });
});

export default routes;
