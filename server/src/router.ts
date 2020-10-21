import { Router } from 'express';
import { DBAccessor } from './dbAccessor';

export const createRouter = () => {
  const router = Router();
  const dbAccessor = new DBAccessor();

  // Read
  router.get('/', async (req, res) => {
    try {
      const data = await dbAccessor.get();
      res.status(200).send({ message: 'get success', data });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'get failed' });
    }
  });

  // Create
  router.put('/', async (req, res) => {
    try {
      await dbAccessor.create();
      res.status(200).send({ message: 'create success' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'create failed' });
    }
  });

  // Update
  router.post('/:taskID', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
  });

  // Delete
  router.delete('/:taskID', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
  });

  return router;
};
