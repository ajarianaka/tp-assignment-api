import { Document } from "mongoose";
import {User} from "./user.interface";
import { Matiere } from "./matiere.interface";

/*
 * Interface with all the document fields, excluding the _id field so it can be extended for multiple uses
 */
interface AssignmentBase extends Document {
  nom: string;
  estSoumis: boolean;
  dateDeRendu: Date;
  note: number;
  auteur: User;
  matiere: Matiere;
}
/*
 * Provides type for Docs returned from queries so operations like `set()` or `save()` can be performed
 */
export interface AssignmentDoc extends AssignmentBase, Document {
}
/*
 * Used as a type for docs sent to API such as on updates or creation
 */

export interface Assignment extends AssignmentBase {
  _id: string;
}