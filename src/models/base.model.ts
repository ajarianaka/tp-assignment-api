import mongoose = require("mongoose");
import { IPopulate } from "../interfaces/IPopulate";
import { ISelect } from "../interfaces/ISelect";
import { IPagination } from "../interfaces/IPagination";

/**
 * Provides common CRUD functionality to provided mongoose moodel.
 */
export class BaseModel {
  public returnNew = { useFindAndModify: false, new: true };

  constructor(public mongooseModel: mongoose.Model<any>) { }

  create<T>(document: any): Promise<T> {
    return this.mongooseModel.create(document);
  }

  find<T>(populate?: IPopulate, select?: ISelect,pagination?:IPagination): Promise<T[]> {
    let query = this.mongooseModel.find();
    if (select) {
      let selectFields = select.remove ? '-' + select.fields.join(" -") : select.fields.join(" ");
      query = query.select(selectFields);
    }
    if (populate) {
      query = query.populate(populate);
    }
    const page = pagination?.page;
    const perPage = pagination?.PageSize;

    if (page && perPage) {
      const skipAmount = (page - 1) * perPage;
      query = query.skip(skipAmount).limit(perPage);
    } 

    return query.exec();
  }


  findById<T>(id: string, populate?: IPopulate, select?: ISelect): Promise<T> {
    if (select) {
      let selectFields = select.remove ? '-' + select.fields.join(" -") : select.fields.join(" ");
      return populate
        ? this.mongooseModel.findById(id).select(selectFields).populate(populate).exec()
        : this.mongooseModel.findById(id).select(selectFields).exec();
    }
    return populate
      ? this.mongooseModel.findById(id).populate(populate).exec()
      : this.mongooseModel.findById(id).exec();
  }

  findOne<T>(query: any, populate?: IPopulate, select?: ISelect): Promise<T> {
    if (select) {
      let selectFields = select.remove ? '-' + select.fields.join(" -") : select.fields.join(" ");
      return populate
        ? this.mongooseModel.findOne(query).select(selectFields).populate(populate).exec()
        : this.mongooseModel.findOne(query).select(selectFields).exec();
    }
    return populate
      ? this.mongooseModel.findOne(query).populate(populate).exec()
      : this.mongooseModel.findOne(query).exec();
  }

  findMany<T>(query: any, populate?: IPopulate, select?: ISelect,pagination?:IPagination): Promise<any[] | T> {
    let queried = this.mongooseModel.find(query);

    if (select) {
      let selectFields = select.remove ? '-' + select.fields.join(" -") : select.fields.join(" ");
      queried = queried.select(selectFields);
    }
    if (populate) {
      queried = queried.populate(populate);
    }
    const page = pagination?.page;
    const perPage = pagination?.PageSize;

    if (page && perPage) {
      const skipAmount = (page - 1) * perPage;
      queried = queried.skip(skipAmount).limit(perPage);
    } 
    return queried.exec();   
  }

  updateById<T>(id: string, document: any, populate?: IPopulate, select?: ISelect): Promise<T> {
    if (select) {
      let selectFields = select.remove ? '-' + select.fields.join(" -") : select.fields.join(" ");
      return populate
        ? this.mongooseModel
          .findByIdAndUpdate(id, document, this.returnNew)
          .select(selectFields)
          .populate(populate)
          .exec()
        : this.mongooseModel
          .findByIdAndUpdate(id, document, this.returnNew)
          .select(selectFields)
          .exec();
    }
    return populate
      ? this.mongooseModel
        .findByIdAndUpdate(id, document, this.returnNew)
        .populate(populate)
        .exec()
      : this.mongooseModel
        .findByIdAndUpdate(id, document, this.returnNew)
        .exec();
  }

  deleteById<T>(id: string): Promise<T> {
    return this.mongooseModel.findByIdAndDelete(id).exec();
  }
}