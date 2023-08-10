import app from '../index';
import supertest from 'supertest'

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('gets endpoint', async () => {
        const response = await request.get('/image/:name');
        expect(response.status).toBe(200);
    }
)});