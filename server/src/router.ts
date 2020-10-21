import { Router } from 'express';
import { DBAccessor } from './dbAccessor';

const dbAccessor = new DBAccessor();

export const createRouter = () => {
  const router = Router();

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
      if (!req.body.title) {
        res.status(400).send({ message: 'title required' });
      }
      await dbAccessor.create(req.body.title);
      res.status(200).send({ message: 'create success' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'create failed' });
    }
  });

  // Update
  router.post('/:taskID', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    res.status(200).send({ message: 'hello, world' });
  });

  // Delete
  router.delete('/:taskID', (req, res) => {
    res.status(200).send({ message: 'hello, world' });
  });

  return router;
};
