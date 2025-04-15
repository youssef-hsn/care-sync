import request from 'supertest';
import { app } from '../../app';

describe('/api/auth endpoint', () => {
    describe('POST /register', () => {
        it('should register a new user with valid data', async () => {
            const userData = { name: 'testUser', phone: '1234567890', password: 'password' };
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('userID');
        });

        it('should return 400 for duplicate phone number', async () => {
            const userData = { phone: '1234567890', password: 'password' };
            await request(app)
                .post('/api/auth/register')
                .send(userData);
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData);
            expect(response.status).toBe(400);
        });
    });

    describe('POST /login', () => {
        it('should login with valid phone number and password', async () => {
            const loginData = { phone: '1234567890', password: 'password' };
            const response = await request(app)
            .post('/api/auth/login')
            .send(loginData);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });

        it('should return 401 for invalid credentials', async () => {
            const loginData = { phone: '1234567890', password: 'wrongpassword' };
            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData);
            expect(response.status).toBe(401);
        });
        it('should return 400 for missing credentials', async () => {
            const loginData = { phone: '1234567890' }; 
            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData);
            expect(response.status).toBe(400);
        });
    })

    describe('POST /refresh-token', () => {
        it('should refresh the access token with a valid refresh token', async () => {
            const loginData = { phone: '1234567890', password: 'password' };
            const loginResponse = await request(app)
                .post('/api/auth/login')
                .send(loginData);
            const refreshToken = loginResponse.body.refreshToken;
            const response = await request(app)
                .post('/api/auth/refresh-token')
                .send({ refreshToken });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('accessToken');
        });

        it('should return 401 for invalid refresh token', async () => {
            const response = await request(app)
                .post('/api/auth/refresh-token')
                .send({ refreshToken: 'invalidtoken' });
            expect(response.status).toBe(401);
        });

        it('should return 400 for missing refresh token', async () => {
            const response = await request(app)
                .post('/api/auth/refresh-token')
                .send({});
            expect(response.status).toBe(400);
        });


    });
    describe('GET /logout', () => {
        it('should logout the user', async () => {
            const response = await request(app)
                .get('/api/auth/logout');
            expect(response.status).toBe(200);
        });

        it('should return 401 if not authenticated', async () => {
            const response = await request(app)
                .get('/api/auth/logout');
            expect(response.status).toBe(401);
        });
    });
});