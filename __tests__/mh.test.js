import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import MHCrisis from '../lib/models/MH.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts a counties mental health phone number via POST', async () => {
    const newService = {
      county: 'Multnomah County',
      info: '503-988-4888'
    };
    const res = await request(app)
      .post('/api/v1/mh-crisis-lines')
      .send(newService);
    
    expect(res.body).toEqual({
      id: '1',
      county: 'Multnomah County',
      info: '503-988-4888'
    });
  });

  it('gets a county by id via GET', async () => {
    const newService = await MHCrisis.insert({
      county: 'Multnomah County',
      info: '503-988-4888'
    });

    const res = await request(app).get(`/api/v1/mh-crisis-lines/${newService.id}`);

    expect(res.body).toEqual(newService);
  });

  it('gets all counties via GET', async () => {
    const firstService = await MHCrisis.insert({
      county: 'Multnomah County',
      info: '503-988-4888'
    });

    const secondService = await MHCrisis.insert({
      county: 'Tillamook County',
      info: '503-842-3900'
    });

    const res = await request(app)
      .get('/api/v1/mh-crisis-lines');

    expect(res.body).toEqual([firstService, secondService]);
  });

  it('updates a county by id via PUT', async () => {
    const newService = await MHCrisis.insert({
      county: 'Multnomah County',
      info: '111-111-1111'
    });

    const res = await request(app)
      .put(`/api/v1/mh-crisis-lines/${newService.id}`)
      .send({ info: '503-988-4888' });

    expect(res.body).toEqual({ ...newService, info: '503-988-4888' });
  });

  it('deletes an existing service by id via DELETE', async () => {
    const newService = await MHCrisis.insert({
      county: 'Multnomah County',
      info: '111-111-1111'
    });

    const res = await request(app)
      .delete(`/api/v1/mh-crisis-lines/${newService.id}`);

    expect(res.body).toEqual({ 
      message: `${newService.county} has been removed.`
    });
  });
});
