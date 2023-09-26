import HttpError from "../helpers/HttpErrors.js";
import Joi from "joi";
import Contact from "../models/Contact.js";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactChangeSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const GetAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  try {
    const result = await Contact.find(filter, null, { skip, limit }).populate(
      "owner",
      "email"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const GetById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const filter = { _id: contactId, owner: req.user._id };
    const result = await Contact.findOne({ filter });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const AddContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw new HttpError(400, "missing required name field");
    }
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const RemoveContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const filter = { _id: contactId, owner: req.user._id };
    const result = await Contact.findOneAndDelete(filter);
    if (!result) {
      throw new HttpError(400, `Not found`);
    }
    res.status(200).json("contact deleted.");
  } catch (error) {
    next(error);
  }
};

const UpdateById = async (req, res, next) => {
  try {
    const { error } = contactChangeSchema.validate(req.body);
    const contactId = req.params.contactId;
    const filter = { _id: contactId, owner: req.user._id };

    if (error) {
      throw HttpError(404, "Missing fields");
    }

    const updatedContactById = await Contact.findOneAndUpdate(
      filter,
      req.body,
      { new: true }
    );
    if (!updatedContactById) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(updatedContactById);
  } catch (error) {
    next(error);
  }
};

const UpdateFavoriteById = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    const contactId = req.params.contactId;
    const filter = { _id: contactId, owner: req.user._id };

    if (error) {
      throw HttpError(404, "Missing field favorite");
    }

    const updatedContactById = await Contact.findOneAndUpdate(
      filter,
      req.body,
      { new: true }
    );
    if (!updatedContactById) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(updatedContactById);
  } catch (error) {
    next(error);
  }
};

export default {
  GetAll,
  GetById,
  AddContact,
  RemoveContact,
  UpdateById,
  UpdateFavoriteById,
};
