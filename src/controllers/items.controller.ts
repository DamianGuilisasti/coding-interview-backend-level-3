import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { IItem } from "../interfaces/items.interface";
import ItemService from "../services/items.service";
import mongoose from "mongoose";

export default {
    ping: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            res.status(httpStatus.OK).json({
                ok: true,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    list: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const items: IItem[] = await ItemService.list();
            res.status(httpStatus.OK).json(items);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    getItemById: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<IItem | Response | void> => {
        try {
            const _id = req.params.id;

            const item: IItem | null = await ItemService.getItemById(_id);

            res.status(httpStatus.OK).json(item);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    create: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const newItem: IItem = req.body;
            const newItemSaved = await ItemService.create(newItem);

            res.status(httpStatus.CREATED).json(newItemSaved);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    update: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | Response> => {
        try {
            const itemId = req.params.id;

            const { name, price } = req.body;

            const response = await ItemService.update(
                itemId,
                name,
                price
            );

            res.status(httpStatus.OK).json(response);
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    delete: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const itemId = req.params.id;
            const response = await ItemService.delete(itemId);

            res.status(httpStatus.NO_CONTENT).send();
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

};
