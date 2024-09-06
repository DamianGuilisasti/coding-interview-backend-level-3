import HttpException from "../exceptions/HttpException";
import ItemModel from "../models/items.model";
import errorMessages from "../responseMessages/errorResponses"

export default {
    itemExistsById: async (itemId: string) => {
        try {
            const itemFound = await ItemModel.find({
                _id: { $in: itemId },
            })

            return itemFound;
        } catch (error) {
            console.log(error);
            throw new HttpException(errorMessages.itemNotFound);
        }
    },
}