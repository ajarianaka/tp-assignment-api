import { Document } from "mongoose";
import { User } from "./user.interface";
//import * as bcrypt from "bcryptjs";
/*
 * Interface with all the document fields, excluding the _id field so it can be extended for multiple uses
 */
interface MatiereBase extends Document {
  nom: string;
  coefficient: number;
  prof: User;
  etudiants: User[];
  photo: string;
}
/*
 * Provides type for Docs returned from queries so operations like `set()` or `save()` can be performed
 */

export interface MatiereDoc extends MatiereBase, Document {}
/*
 * Used as a type for docs sent to API such as on updates or creation
 */

export interface Matiere extends MatiereBase {
  _id: string;
}
