import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { UserModel } from "../models/user.model";
import { UserDoc } from "../interfaces/user.interface";
var jwt = require("jsonwebtoken");
import { configs } from "../config/auth.config";
import * as bcrypt from "bcryptjs";

export class UserController extends BaseController {
  constructor() {
    super(new UserModel());
  }

  async createUser(req: Request, res: Response) {
    let user: any = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      photo: req.body.photo,
      isAdmin: req.body.isAdmin,
      isProf: req.body.isProf,
      password: await bcrypt.hash(req.body.password, 8),
    };
    this.create(res, user);
  }

  async login(req: Request, res: Response) {
    let credential: any = {
      email: req.body.email,
    };

    await this.model.findOne<UserDoc>(credential).then(
      (doc) => {
        if (doc == null) {
          res.status(200).json({
            errorCode: "INVALID_CREDENTIAL",
            message: "Invalid credential",
          });
          return;
        }

        let result = bcrypt.compareSync(req.body.password, doc.password);
        if (result) {
          let accessToken = jwt.sign(
            {
              id: doc._id,
              isProf: doc.isProf || doc.isAdmin,
              isAdmin: doc.isAdmin,
            },
            configs.secret,
            { expiresIn: 3600 }
          );
          res.setHeader("x-token", accessToken);
          this.jsonRes(doc, res);
        } else {
          res.status(200).json({
            errorCode: "INVALID_CREDENTIAL",
            message: "Invalid credential",
          });
        }
      },
      (err) => {
        this.errRes(err, res, "errMsg");
      }
    );
  }

  async updateUserById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<UserDoc>(req.params.id);
      doc.firstName = req.body.firstName;
      doc.lastName = req.body.lastName;
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed");
    }
  }

  getUserList(res: Response) {
    return this.findMany(res, {}, undefined, { remove: true, fields: ["password"] }, "");
  }
}
