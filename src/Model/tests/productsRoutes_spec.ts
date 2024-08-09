import request from 'supertest';
import app from '../../server'


describe("get products", () => {
    it('return 200 if success', async () => {
        const res = await request(app).get('/product');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).get('/product/1');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).post('/product').send({
          name: "name",
          price: "100",
        });
      expect(res.statusCode).toEqual(200);
    });
});


