import request from 'supertest';
import app from '../../server'


describe("get orders", () => {
    it('return 200 if success', async () => {
        const res = await request(app).get('/order');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).get('/order/1');
      expect(res.statusCode).toEqual(200);
    });


    it('return 200 if success', async () => {
        const res = await request(app).post('/order').send({
            quantity:1 , 
            id:1, 
            productID:1
        });
      expect(res.statusCode).toEqual(200);
    });
});


