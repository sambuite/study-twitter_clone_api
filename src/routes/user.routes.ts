import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from 'src/repositories/UserRepository';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  try {
    const repo = getCustomRepository(UserRepository);
    const response = await repo.save(req.body);
    return res.json(response).send();
  } catch (error) {
    console.log('error register', error);
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const repo = getCustomRepository(UserRepository);
    const response = await repo.find();
    return res.json(response).send();
  } catch (error) {
    console.log('error register', error);
  }
});

userRouter.get('/:nickname', async (req, res) => {
  try {
    const { nickname } = req.params;

    const repo = getCustomRepository(UserRepository);

    const data = await repo.findByNickname(nickname);

    return res.json(data).status(200);
  } catch (error) {
    console.log('error register', error);
    return res.json({ error: 'Something went wrong' }).status(501);
  }
});

export default userRouter;
