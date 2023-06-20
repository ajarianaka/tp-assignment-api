import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { MatiereDoc } from "../interfaces/matiere.interface";
import { AssignmentModel } from "../models/assignment.model";
import { AssignmentDoc } from "../interfaces/assignment.interface";

export class AssignmentController extends BaseController {
  constructor() {
    super(new AssignmentModel());
  }

  createAssigments(req: Request, res: Response) {
    let matiere = {
      title: req.body.title,
      description: req.body.description,
      amount: req.body.amount,
      type: req.body.type,
      date: req.body.date,
      author: req.body.userId,
      project: <string>req.headers["x-project-id"]
    };
    this.create(res, matiere);
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

  getAssignments(req: Request, res: Response) {
    let filter: any = {
      project: <string>req.headers["x-project-id"]
    }
    return this.findMany(res, filter, { path: 'author' }, undefined, "");
  }

  deleteAssignmentById(req: Request, res: Response) {
    return this.deleteById(res, req.params.id)
  }
}