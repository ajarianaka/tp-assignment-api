import { Document } from "mongoose";
/*
 * Interface with all the document fields, excluding the _id field so it can be extended for multiple uses
 */
interface UserBase extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isProf: boolean;
  isAdmin: boolean;
  photo: string;
}
/*
 * Provides type for Docs returned from queries so operations like `set()` or `save()` can be performed
 */

export interface UserDoc extends UserBase, Document {}
/*
 * Used as a type for docs sent to API such as on updates or creation
 */

export interface User extends UserBase {
  _id: string;
}
