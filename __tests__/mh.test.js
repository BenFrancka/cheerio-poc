import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('inserts a counties mental health phone number via POST', async () => {
    const newService = {
      county: 'Multnomah County',
      info: '503-988-4888',
    };
    const res = await request(app)
      .post('/api/v1/crisis-lines')
      .send(newService);
    
    expect(res.body).toEqual({
      id: '1',
      county: 'Multnomah County',
      info: '503-988-4888',
    });
  });
});
