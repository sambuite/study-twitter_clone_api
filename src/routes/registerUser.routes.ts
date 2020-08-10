import { Router } from 'express';

const registerUserRouter = Router();

registerUserRouter.get('/', (req, res) => {
  return res.send('Hello World');
});

export default registerUserRouter;
