import { Router } from 'express';
import RegisterController from '@controllers/RegisterControllers';

const routes = Router();

routes.post('/login', (req, res) => {
  return res.json({ message: 'Logged' });
});

routes.post('/register', RegisterController.create);

export default routes;
