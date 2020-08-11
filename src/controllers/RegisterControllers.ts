import { Request, Response } from 'express';
import db from 'src/database/connection';

class RegisterController {
  async create(req: Request, res: Response) {
    return res.json({ message: 'ok' });
  }
}

export default new RegisterController();
