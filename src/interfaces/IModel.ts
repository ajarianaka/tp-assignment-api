import { IPopulate } from "./IPopulate";
import mongoose = require('mongoose')
import { ISelect } from "./ISelect";
import { IPagination } from "./IPagination";
export interface IModel {
    mongooseModel: mongoose.Model<any>;
    create<T>(document: any): Promise<T>;
    find(populate?: IPopulate, select?: ISelect, pagination?: IPagination,): Promise<any[]>;
    findById<T>(id: string, populate?: IPopulate, select?: ISelect): Promise<T>;
    findOne<T>(query: any, populate?: IPopulate, select?: ISelect): Promise<T>;
    findMany<T>(query: any, populate?: IPopulate, select?: ISelect, pagination?: IPagination,): Promise<any[] | T>;
    updateById<T>(id: string, document: any, populate?: IPopulate | IPopulate[], select?: ISelect): Promise<T>;
    deleteById<T>(id: string): Promise<T>;
}