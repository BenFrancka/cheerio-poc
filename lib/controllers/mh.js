import { Router } from 'express';
import MHCrisis from '../models/MH.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const booger = await MHCrisis.insert(req.body);

      res.send(booger);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const booger = await MHCrisis.getById(id);
      res.send(booger);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const boogers = await MHCrisis.getAll();

      res.send(boogers);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { county, info } = req.body;
      const updatedBooger = await MHCrisis.updateById(id, { county, info });

      res.send(updatedBooger);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const booger = await MHCrisis.deleteById(id);

      res.send({ message : `${booger.county} has been removed.`, });
    } catch (err) {
      next(err);
    }
  });





