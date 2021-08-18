import { Router } from 'express';
import MHCrisis from '../models/MH.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const booger = await MHCrisis.insert({
      ...req.body,
    });

    res.send(booger);
  } catch (error) {
    next(error);
  }
});
