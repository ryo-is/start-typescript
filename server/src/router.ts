import { Router } from 'express';
import { DBAccessor } from './dbAccessor';

const dbAccessor = new DBAccessor();

export const createRouter = () => {
  const router = Router();

  // Read
  router.get('/', async (req, res) => {
    try {
      const resBody = await dbAccessor.get();
      res.status(200).send({ message: 'get success', resBody });
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
  router.post('/:taskID', async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: 'body required' });
      }
      await dbAccessor.update({ uuid: req.params.taskID, ...req.body });
      res.status(200).send({ message: 'update success' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'update failed' });
    }
  });

  // Delete
  router.delete('/:taskID', async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: 'body required' });
      }
      await dbAccessor.delete({ uuid: req.params.taskID });
      res.status(200).send({ message: 'delete success' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'delete failed' });
    }
  });

  return router;
};
