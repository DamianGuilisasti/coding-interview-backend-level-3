import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export const validateItem = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;

  const errors: { field: string; message: string }[] = [];

  if (!name) {
    errors.push({
      field: 'name',
      message: 'Field "name" is required',
    });
  }

  if (price === undefined) {
    errors.push({
      field: 'price',
      message: 'Field "price" is required',
    });
  } else {
    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      errors.push({
        field: 'price',
        message: 'Field "price" must be a number',
      });
    } else if (priceNumber < 0) {
      errors.push({
        field: 'price',
        message: 'Field "price" cannot be negative',
      });
    }
  }

  if (errors.length > 0) {
    return res.status(httpStatus.BAD_REQUEST).json({ errors });
  }

  next();
};
