import request from 'supertest';
import app from '../../server'


describe("get users", () => {
    it('return 200 if success', async () => {
        const res = await request(app).get('/user');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).get('/user/1');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).post('/user').send({
            
          firstName: "firstName",
          lastName: "lastName",
          password: "pass",
        });
      expect(res.statusCode).toEqual(200);
    });
});


