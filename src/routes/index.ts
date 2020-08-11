import { Router } from 'express';

const routes = Router();

routes.post('/login', (req, res) => {
  return res.json({ message: 'Logged' });
});

routes.post('/register', (req, res) => {
  return res.json({message: 'Ok'})
});

export default routes;
