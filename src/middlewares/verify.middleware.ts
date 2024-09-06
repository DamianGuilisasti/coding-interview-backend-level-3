import mongoose from "mongoose";
import HttpException from "../exceptions/HttpException";
import errorMessages from "../responseMessages/errorResponses";
import itemHelper from "../utils/itemHelper";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export default {
  itemExistById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const _id = req.params.id;

      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(httpStatus.NOT_FOUND).json({
          message: "Invalid item ID",
          errorCode: 0,
        });
      }

      const itemFound = await itemHelper.itemExistsById(_id);

      if (itemFound.length === 0) {
        throw new HttpException(errorMessages.itemNotFound);
      }

      next();
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.statusCode).json({
          message: error.message,
          errorCode: error.errorCode,
        });
      } else {
        next(error);
      }
    }
  },
};