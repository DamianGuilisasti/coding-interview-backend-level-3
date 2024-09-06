import request from 'supertest';
import supertest from "supertest"
import express, { Express } from 'express';
import mongoose from "mongoose";
import { mongodbConnection } from '../src/database';
import { app, server } from "..//src/app";
import ItemModel from '../src/models/items.model';

const api = supertest(app);

describe('E2E Tests', () => {
    let app: Express;

    type Item = {
        id: number;
        name: string;
        price: number;
    };

    // Connect to MongoDB before all tests
    beforeAll(async () => {
        await mongodbConnection(); // Connect to MongoDB
    });


    // Disconnect from MongoDB after all tests
    afterAll(async () => {
        try {
            // Delete all documents from the itemModel
            await ItemModel.deleteMany({});
            console.log('All items deleted from the database.');
        } catch (error) {
            console.error('Error deleting items:', error);
        } finally {
            // Close MongoDB connection
            await mongoose.connection.close();
        }
    });

    it('should get a response with status code 200', async () => {
        const response = await api.get('/ping');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ ok: true });
    });

    describe('Basic Items functionality', () => {
        jest.setTimeout(10000);
        it('should be able to list all items', async () => {
            const response = await api.get('/items');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual([]);

            await api
                .post('/items')
                .send({
                    name: 'Item 1',
                    price: 10
                });

            const response2 = await api.get('/items');
            expect(response2.statusCode).toBe(200);
            expect(response2.body).toEqual([
                {
                    _id: expect.any(String),
                    __v: expect.any(Number), // Version field added by Mongoose
                    name: 'Item 1',
                    price: 10,
                    createdAt: expect.any(String), 
                    updatedAt: expect.any(String) 
                }
            ]);
        });

        it('should be able to create a new item and get it by id', async () => {
            const response = await api
                .post('/items')
                .send({
                    name: 'Item 2',
                    price: 10
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual({
                _id: expect.any(String),
                __v: expect.any(Number), // Version field added by Mongoose
                name: 'Item 2',
                price: 10,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String) 
            });

            const response2 = await api.get(`/items/${response.body._id}`);
            expect(response2.statusCode).toBe(200);
            expect(response2.body).toEqual({
                _id: expect.any(String),
                __v: expect.any(Number), // Version field added by Mongoose
                name: 'Item 2',
                price: 10,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String) 
            });
        });

        it('should be able to update an item', async () => {
            const { body: createdItem } = await api
                .post('/items')
                .send({
                    name: 'Item 3',
                    price: 10
                });

            expect(createdItem).toBeDefined();

            const response = await api
                .put(`/items/${createdItem._id}`)
                .send({
                    name: 'Item 1 updated',
                    price: 20
                });
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                _id: expect.any(String),
                __v: expect.any(Number), // Version field added by Mongoose
                name: 'Item 1 updated',
                price: 20,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String) 
            });

            const response2 = await api.get(`/items/${createdItem._id}`);
            expect(response2.statusCode).toBe(200);
            expect(response2.body).toEqual({
                _id: createdItem._id,
                __v: expect.any(Number), // Version field added by Mongoose
                name: 'Item 1 updated',
                price: 20,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String) 
            });
        });

        it('should be able to delete an item', async () => {
            const { body: createdItem } = await api
                .post('/items')
                .send({
                    name: 'Item 4',
                    price: 10
                });

            expect(createdItem).toBeDefined();

            const response = await api.delete(`/items/${createdItem._id}`);
            expect(response.statusCode).toBe(204);

            const response2 = await api.get(`/items/${createdItem._id}`);
            expect(response2.statusCode).toBe(404);
        });
    });

    describe('Validations', () => {
        it('should validate required fields', async () => {
            const response = await api
                .post('/items')
                .send({
                    name: 'Item 1'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                errors: [
                    {
                        field: 'price',
                        message: 'Field "price" is required'
                    }
                ]
            });
        });

        it('should not allow for negative pricing for new items', async () => {
            const response = await api
                .post('/items')
                .send({
                    name: 'Item 1',
                    price: -10
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                errors: [
                    {
                        field: 'price',
                        message: 'Field "price" cannot be negative'
                    }
                ]
            });
        });

        it('should not allow for negative pricing for updated items', async () => {
            const { body: createdItem } = await api
                .post('/items')
                .send({
                    name: 'Item 1',
                    price: 10
                });

            expect(createdItem).toBeDefined();

            const response = await api
                .put(`/items/${createdItem.id}`)
                .send({
                    name: 'Item 1 updated',
                    price: -20
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                errors: [
                    {
                        field: 'price',
                        message: 'Field "price" cannot be negative'
                    }
                ]
            });
        });
    });
});
