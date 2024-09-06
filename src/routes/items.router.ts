import Router from "express-promise-router";
import ItemsController from "../controllers/items.controller";
import { validateItem } from "../middlewares/validation.middleware";
import verify from "../middlewares/verify.middleware";

const router = Router();

router.get(
    "/ping",
    ItemsController.ping
);

router.get(
    "/items",
    ItemsController.list
);

router.get(
    "/items/:id",
    [verify.itemExistById],
    ItemsController.getItemById
);

router.post(
    "/items",
    [validateItem],
    ItemsController.create
);

router.put(
    "/items/:id",
    [validateItem, verify.itemExistById],
    ItemsController.update
);

router.delete(
    "/items/:id",
    ItemsController.delete
);


export default router;
