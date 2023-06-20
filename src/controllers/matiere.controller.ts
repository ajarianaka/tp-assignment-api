import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { MatiereDoc } from "../interfaces/matiere.interface";
import { MatiereModel } from "../models/matiere.model";

export class MatiereController extends BaseController {
  constructor() {
    super(new MatiereModel());
  }

  createMatiere(req: Request, res: Response) {
    let matiere = {
      title: req.body.title,
      description: req.body.description,
      amount: req.body.amount,
      type:req.body.type,
      date:req.body.date,
      author: req.body.userId,
      project: <string>req.headers["x-project-id"]
    };
    this.create(res, matiere);
  }

  async updateMatiereById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<MatiereDoc>(req.params.id);
      doc.nom = req.body.nom;
      doc.coefficient = req.body.coefficient;
      doc.prof = req.body.prof;
      doc.etudiants = req.body.prof;
      doc.photo = req.body.photo;
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed");
    }
  }

  getMatieres(req: Request,res: Response) {
    let filter:any={
      project:<string>req.headers["x-project-id"]
    }
    return this.findMany(res, filter, {path:'author'},undefined, "");
  }

  deleteMatiereById(req: Request, res: Response) {
    return this.deleteById(res, req.params.id)
  }
}