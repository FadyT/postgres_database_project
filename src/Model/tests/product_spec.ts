import { describe } from 'node:test';
import { product, productStore } from '../product';
import supertest from 'supertest';

const store = new productStore()

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

  
  it('create method should add a book', async () => {
    const result = await store.create({
        name: 'product 1',
        price: 250
    });
    expect(result).toEqual({
        name: 'product 1',
        price: 250
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([{
        name: 'product 1',
        price: 250
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
        name: 'product 1',
        price: 250
    });
  });

  
});