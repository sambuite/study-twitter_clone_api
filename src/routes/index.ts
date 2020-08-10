import { Router } from 'express';

const routes = Router();

routes.get('/login', (req, res) => {
  return res.send('Hello World');
});

routes.get('/register', (req, res) => {
  return res.send('Hello World');
});

export default routes;
