import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { AssignmentModel } from "../models/assignment.model";
import { AssignmentDoc } from "../interfaces/assignment.interface";
import { MatiereModel } from "../models/matiere.model";
import { MatiereDoc } from "../interfaces/matiere.interface";

export class AssignmentController extends BaseController {
  constructor() {
    super(new AssignmentModel());
  }

  async createAssigments(req: Request, res: Response) {
    const matiereModel = new MatiereModel();
    const doc = await matiereModel.findById<MatiereDoc>(req.params.id);
    let assigments:any[]=[];
    doc.etudiants.forEach((etudiant)=>{
      let assignment = {
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        auteur: etudiant,
        matiere: doc.id
      };
      assigments.push(assignment);
    })
    const savedRecords = await mongoose.model('Assignment').insertMany(assigments);
    res.status(200).json(savedRecords);
  }

  async updateAssignmentById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<AssignmentDoc>(req.params.id);
      doc.nom = req.body.nom;
      doc.note = req.body.note;
      doc.auteur = req.body.auteur;
      doc.matiere = req.body.matiere;
      doc.dateDeRendu = req.body.dateDeRendu;
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed");
    }
  }

  async submitAssignmentById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<AssignmentDoc>(req.params.id);
      doc.estSoumis = true;     
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed"); 
    }
  }

  async markAssignmentById(req: Request, res: Response) {
    try {
      const doc = await this.model.findById<AssignmentDoc>(req.params.id);
      doc.note = req.body.note;     
      await doc.save();
      this.jsonRes(doc, res);
    } catch (e) {
      this.errRes(e, res, "Failed");
    }
  }

  getAssignments(req: Request, res: Response) {
    let filter: any = {
      project: <string>req.headers["x-project-id"]
    }
    return this.findMany(res, filter, { path: 'author' }, undefined,undefined, "");
  }

  deleteAssignmentById(req: Request, res: Response) {
    return this.deleteById(res, req.params.id)
  }
}