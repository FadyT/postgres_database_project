import { describe } from 'node:test';
import { user, usersList } from '../user';
import supertest from 'supertest';

const users = new usersList()

describe("user Model", () => {
  it('should have an index method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(users.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(users.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(users.authenticate).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(users.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await users.create({
      firstName:"FN ",
      lastName:"LN",
      password : "pswd"
    });
    expect(result).toEqual({
      firstName:"FN ",
      lastName:"LN",
      password : "pswd"
    });
  });

  it('index method should return a list of books', async () => {
    const result = await users.index();
    expect(result).toEqual([{
      firstName:"FN ",
      lastName:"LN",
      password : "pswd"
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await users.show("1");
    expect(result).toEqual({
      firstName:"FN ",
      lastName:"LN",
      password : "pswd"
    });
  });

  it('delete method should remove the book', async () => {
    users.delete("1");
    const result = await users.index()

    expect(result).toEqual([]);
  });
});