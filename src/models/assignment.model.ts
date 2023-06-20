import mongoose, { Document, Schema } from 'mongoose';
import { BaseModel } from './base.model';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const AssignmentSchema: Schema = new Schema({
  nom: { type: String, required: true },
  estSoumis: { type: Boolean, required: false },
  dateDeRendu: { type: Date, required: true },
  note: { type: Number, required: true },
  auteur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true }
});

AssignmentSchema.plugin(aggregatePaginate);

export class AssignmentModel extends BaseModel {
  constructor() {
    super(
      mongoose.model('Transaction', AssignmentSchema)
    )
  }
}
