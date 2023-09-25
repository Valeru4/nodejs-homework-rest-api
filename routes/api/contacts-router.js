import express from "express";
import Controllers from "../../controllers/contacts-controllers.js";
import isValidId from "../../middleware/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", Controllers.GetAll);

contactsRouter.get("/:id", isValidId, Controllers.GetById);

contactsRouter.post("/", Controllers.AddContact);

contactsRouter.delete("/:contactId", Controllers.RemoveContact);

contactsRouter.put("/:contactId", isValidId, Controllers.UpdateById);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  Controllers.UpdateFavoriteById
);

export default contactsRouter;
