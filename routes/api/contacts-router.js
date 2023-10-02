import express from "express";
import Controllers from "../../controllers/contacts-controllers.js";
import isValidid from "../../middleware/isValidId.js";
import authenticate from "../../middleware/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, Controllers.GetAll);

contactsRouter.get("/:id", authenticate, isValidid, Controllers.GetById);

contactsRouter.post("/", authenticate, Controllers.AddContact);

contactsRouter.delete("/:contactId", authenticate, Controllers.RemoveContact);

contactsRouter.put(
  "/:contactId",
  authenticate,
  isValidid,
  Controllers.UpdateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  isValidid,
  Controllers.UpdateFavoriteById
);

export default contactsRouter;
