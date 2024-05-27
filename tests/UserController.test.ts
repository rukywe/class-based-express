import request from 'supertest';
import { App } from '../src/App';

const app = new App().app;

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
    expect(res.body.email).toBe('john@example.com');
  });

  it('should fail to create a user with invalid data', async () => {
    const res = await request(app).post('/users').send({
      name: '',
      email: ''
    });
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid user data');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a user by ID', async () => {
    const createUserRes = await request(app).post('/users').send({
      name: 'Jane Doe',
      email: 'jane@example.com'
    });
    const userId = createUserRes.body.id;

    const res = await request(app).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.name).toBe('Jane Doe');
    expect(res.body.email).toBe('jane@example.com');
  });

  it('should delete a user', async () => {
    const createUserRes = await request(app).post('/users').send({
      name: 'John Smith',
      email: 'john.smith@example.com'
    });
    const userId = createUserRes.body.id;

    const deleteRes = await request(app).delete(`/users/${userId}`);
    expect(deleteRes.status).toBe(204);

    const getUserRes = await request(app).get(`/users/${userId}`);
    expect(getUserRes.status).toBe(404);
  });
});
