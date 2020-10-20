import { Router } from 'express';

export const createRouter = () => {
  const router = Router();

  router.get('/helloWorld', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
  });

  return router;
};
