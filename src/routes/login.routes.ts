import { Router } from 'express';

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  return res.send('Hello World');
});

export default loginRouter;
