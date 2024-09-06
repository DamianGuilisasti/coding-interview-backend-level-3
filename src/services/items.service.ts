import { Request } from "express";
import config from "../config/index.config";
import HttpException from "../exceptions/HttpException";
import { IItem } from "../interfaces/items.interface";
import itemModel from "../models/items.model";
import errorMessages from "../responseMessages/errorResponses";


export default {

    list: async (): Promise<IItem[]> => {
        try {
            const items = await itemModel.find()
            return items;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    getItemById: async (_id: string): Promise<IItem | null> => {
        try {
            const item = await itemModel.findById(_id)

            if (!item) return null;

            return item;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    create: async (newItemData: IItem): Promise<IItem> => {
        try {
            const { name, price } = newItemData;


            const newItem = new itemModel({
                name, price
            });

            const newItemSaved: IItem = await newItem.save();


            return newItemSaved;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    update: async (
        itemId: string,
        name: string,
        price: number
    ): Promise<IItem | null> => {
        try {

            const itemUpdated = await itemModel.findOneAndUpdate(
                {
                    _id: itemId,
                },
                {
                    name,
                    price
                },
                { new: true }
            );

            return itemUpdated;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    delete: async (_id: string): Promise<void> => {
        try {
            await itemModel.findOneAndDelete(
                { _id: _id }
            );
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

};
