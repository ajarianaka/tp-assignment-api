import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { MatiereDoc } from "../interfaces/matiere.interface";
import { MatiereModel } from "../models/matiere.model";
import { IPagination } from "../interfaces/IPagination";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { JwtPayload } from "jsonwebtoken";

export class MatiereController extends BaseController {
  constructor() {
    super(new MatiereModel());
  }

  createMatiere(req: Request, res: Response) {
    let matiere = {
      nom: req.body.nom,
      coefficient: req.body.coefficient,
      photo: req.body.photo,
      prof: req.body.prof,
      etudiants: req.body.etudiants
    };
    this.create(res, matiere);
  }

  async updateMatiereById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<MatiereDoc>(req.params.id);
      doc.nom = req.body.nom;
      doc.coefficient = req.body.coefficient;
      doc.prof = req.body.prof;
      doc.etudiants = req.body.etudiants;
      doc.photo = req.body.photo;
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed");
    }
  }

  getMatieres(req: Request, res: Response) {
    let userInfo: any = (req as CustomRequest).userInfo;
    let filter: any = userInfo['isAdmin'].toString() === 'true' ? {} : { prof: userInfo['id'] };
    let pagination: IPagination = {
      page: req.query.page ? parseInt(req.query.page.toString()) : undefined,
      PageSize: req.query.pageSize ? parseInt(req.query.pageSize!.toString()) : undefined
    }
    return this.findMany(res, filter, { path: 'prof etudiants', select: '-password' }, { remove: true, fields: ["password"] }, pagination, "");
  }

  deleteMatiereById(req: Request, res: Response) {
    return this.deleteById(res, req.params.id)
  }
}