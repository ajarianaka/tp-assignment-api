import mongoose, { Document, Schema } from "mongoose";
import { BaseModel } from "./base.model";
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isProf: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: false },
  photo: { type: String, required: false },
});

UserSchema.plugin(aggregatePaginate);

export class UserModel extends BaseModel {
  constructor() {
    super(mongoose.model("User", UserSchema));
  }
}
