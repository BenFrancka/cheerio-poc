import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import mhControllers from './controllers/mh.js';

const app = express();

app.use(express.json());

app.use('/api/v1/mh-crisis-lines', mhControllers);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
