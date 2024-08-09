import { describe } from 'node:test';
import { order, OrdersList } from '../order';
import supertest from 'supertest';

const store = new OrdersList()

describe("product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have add product method', () => {
    expect(store.addProductToOrder).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add order', async () => {
    const result = await store.create({
      productid:1 , 
      productquantity : 2,
      user_id : 1,
      orderstatus:'Active'
    });
    expect(result).toEqual({
      productid:1 , 
      productquantity : 2,
      user_id : 1,
      orderstatus:'Active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      productid:1 , 
      productquantity : 2,
      user_id : 1,
      orderstatus:'Active'
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      productid:1 , 
      productquantity : 2,
      user_id : 1,
      orderstatus:'Active'
    });
  });

  it('delete method should remove the book', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});