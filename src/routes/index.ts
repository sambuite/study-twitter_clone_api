import { Router } from 'express';

import registerUserRouter from './registerUser.routes';
import loginRouter from './login.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/register', registerUserRouter);

export default routes;
