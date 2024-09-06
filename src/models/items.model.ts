import * as mongoose from "mongoose";
import { IItem } from "../interfaces/items.interface";

const ItemSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "Items",
    }
);

const ItemModel = mongoose.model<IItem & mongoose.Document>("Items", ItemSchema);

export default ItemModel;
