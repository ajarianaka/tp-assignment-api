import mongoose, { Document, Schema } from "mongoose";
import { BaseModel } from "./base.model";
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const MatiereSchema: Schema = new Schema({
  nom: { type: String, required: true },
  coefficient: { type: Number, required: true },
  prof: { type: Schema.Types.ObjectId, ref: "User", required: true },
  etudiants: { type: [Schema.Types.ObjectId], ref: "User", required: true },
  photo: { type: String, required: false },
});

MatiereSchema.plugin(aggregatePaginate);

export class MatiereModel extends BaseModel {
  constructor() {
    super(mongoose.model("Matiere", MatiereSchema));
  }
}
