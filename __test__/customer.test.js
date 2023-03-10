const app = require('../app');
const request = require('supertest');
const { Customers, Roles, sequelize } = require('../models');
const bcrypt = require('bcrypt');
let token = '';

beforeAll(async () => {
    await sequelize.sync({
        force: true,
    });

    await Roles.bulkCreate([
        {
            id: 1,
            name: 'ADMIN',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ])

    await Customers.bulkCreate(
        [
            {
                first_name: 'Guillaume',
                last_name: 'Bongrand',
                email: 'guillaumebongrand.lamanu@gmail.com',
                password: await bcrypt.hash('password', 10),
                notifications: 1,
                roles_id: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                first_name: 'Amadou',
                last_name: 'Camara',
                email: 'amadoucamara.lamanu@gmail.com',
                password: await bcrypt.hash('password', 10),
                notifications: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]
    );

    const res = await request(app).post('/customers/authenticate').send({
        email: 'guillaumebongrand.lamanu@gmail.com',
        password: 'password',
    });
    token = res.body.data.token;
});

afterAll(async () => {
    await sequelize.close();
});

describe('Customer routes', () => {
    describe('GET /customers', () => {
        it('should return a 200 status code', async () => {
        const res = await request(app).get('/customers').set(
        'Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        });

        it('should return a nomber of students record', async () => {
        const res = await request(app).get('/customers').set(
        'Authorization', `Bearer ${token}`);
        expect(res.body).toHaveProperty('count');
        expect(res.body.count).toBe(2);
        });

        it('should return correct data in db', async () => {
        const res = await request(app).get('/customers').set(
        'Authorization', `Bearer ${token}`);
        expect(res.body.customers[0]).toMatchObject({
            id: 1,
            first_name: 'Guillaume',
            last_name: 'Bongrand',
        });

        expect(res.body.customers[1]).toMatchObject({
            id: 2,
            first_name: 'Amadou',
            last_name: 'Camara',
        });
        });
    });

    describe('GET /customers/:id', () => {
        it('should return a 200 status code', async () => {
        const res = await request(app).get('/customers/1');
        expect(res.statusCode).toBe(200);
        });

        it('should return a customer with id 1', async () => {
        const res = await request(app).get('/customers/1');
        expect(res.body).toHaveProperty('first_name', 'Guillaume');
        expect(res.body).toHaveProperty('last_name', 'Bongrand');
        });
    });

    describe('POST /customers', () => {
        it('should create a new customer', async () => {
        const currentDate = new Date();
        const fullYear = currentDate.getFullYear();
        const month =
            currentDate.getMonth() + 1 < 10
            ? `0${currentDate.getMonth() + 1}`
            : currentDate.getMonth() + 1;
        const day = 
            currentDate.getDate().length > 1
            ? currentDate.getDate()
            : `0${currentDate.getDate()}`;
        const res = await request(app).post('/customers/create').send({
            first_name: 'Loic',
            last_name: 'Magny',
            email: 'loicmagny.lamanu@gmail.com',
            password: 'LoicMagnyMdp'
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('first_name', 'Loic');
        expect(res.body).toHaveProperty('last_name', 'Magny');
        expect(res.body).not.toHaveProperty('password', 'LoicMagnyMdp');
        expect(res.body.createdAt).toContain(`${fullYear}-${month}-${day}`);
        });
    });

    describe('PATCH /customers/:id', () => {
        it('should update an existing customers', async () => {
        const res = await request(app).patch('/customers/1').send({
            first_name: 'Guigui',
        }).set(
        'Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty(
            'message',
            'Customer Updated'
        );
        });

        it('should return error message for update req with bad id', async () => {
            try {
                const res = await request(app).patch('/customers/100').send({
                    firstname: 'Guigui',
                });
            } catch(err) {
                expect(res.statusCode).toEqual(404);
                expect(res.body).toHaveProperty(
                    'message',
                    'This customer does not exist !'
                );
            }
        });
    });

    describe('DELETE /customers/:id', () => {
        it('should delete an existing students', async () => {
        try {
            const res = await request(app).delete('/customers/2');
        } catch(err) {
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty(
                'message',
                'Unauthorized'
            );
        }
        });
    });

    describe('Test non-existent route', () => {
        it('return 404 error', async () => {
            const res = await request(app).put('/customers/:id')
            expect(res.statusCode).toBe(404);
        })
    })
});