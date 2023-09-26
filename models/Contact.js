import { Schema, model } from "mongoose";
import { handleRunValidateAndUpdate, handleSaveError } from "./hooks.js";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

contactSchema.post("save", handleSaveError);
contactSchema.pre("findOneAndUpdate", handleRunValidateAndUpdate);
contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
