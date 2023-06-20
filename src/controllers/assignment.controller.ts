import mongoose = require("mongoose");
import { BaseController } from "./base.controller";
import { Response, Request } from "express";
import { AssignmentModel } from "../models/assignment.model";
import { AssignmentDoc } from "../interfaces/assignment.interface";
import { MatiereModel } from "../models/matiere.model";
import { MatiereDoc } from "../interfaces/matiere.interface";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { IPagination } from "../interfaces/IPagination";

export class AssignmentController extends BaseController {
  constructor() {
    super(new AssignmentModel());
  }

  async createAssigments(req: Request, res: Response) {
    const matiereModel = new MatiereModel();
    const doc = await matiereModel.findById<MatiereDoc>(req.params.id);
    let assigments: any[] = [];
    doc.etudiants.forEach((etudiant) => {
      let assignment = {
        nom: req.body.nom,
        dateDeRendu: req.body.dateDeRendu,
        estSoumis: false,
        note: -1,
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

  async getAssignments(req: Request, res: Response) {
    let filter: any = {};
    let userInfo: any = (req as CustomRequest).userInfo;

    if (userInfo['isAdmin'].toString() === 'true') {

    } else if (userInfo['isProf'].toString() === 'true') {
      const relatedRecords = await new MatiereModel().findMany({ prof: userInfo['id'] }, undefined, { remove: false, fields: ["_id"] });
      filter = {
        'matiere': { $in: relatedRecords }
      };
    } else {
      filter = {
        $and: [
          { auteur: userInfo['id'] }, { estSoumis: false }, { note: { $lt: 0 } }]
      };
    }
    let pagination: IPagination = {
      page: req.query.page ? parseInt(req.query.page.toString()) : undefined,
      PageSize: req.query.pageSize ? parseInt(req.query.pageSize!.toString()) : undefined
    }

    return this.findMany(res, filter, { path: 'auteur matiere', select: '-password' }, undefined, pagination, "");
  }

  async getAssignmentsByMatiere(req: Request, res: Response) {
    let filter: any = { matiere: req.params.id };
    let pagination: IPagination = {
      page: req.query.page ? parseInt(req.query.page.toString()) : undefined,
      PageSize: req.query.pageSize ? parseInt(req.query.pageSize!.toString()) : undefined
    }

    return this.findMany(res, filter, { path: 'auteur matiere', select: '-password' }, undefined, pagination, "");
  }

  async getSubmittedAssignments(req: Request, res: Response) {
    let filter: any = {};
    let userInfo: any = (req as CustomRequest).userInfo;

    if (userInfo['isAdmin'].toString() === 'true') {
      filter = {
        $and: [
          { estSoumis: true }, { note: { $lt: 0 } }]
      };
    } else if (userInfo['isProf'].toString() === 'true') {
      const relatedRecords = await new MatiereModel().findMany({ prof: userInfo['id'] }, undefined, { remove: false, fields: ["_id"] });
      filter = {
        $and: [
          { matiere: { $in: relatedRecords } }, { estSoumis: true }, { note: { $lt: 0 } }
        ]
      };
    }
    let pagination: IPagination = {
      page: req.query.page ? parseInt(req.query.page.toString()) : undefined,
      PageSize: req.query.pageSize ? parseInt(req.query.pageSize!.toString()) : undefined
    }

    return this.findMany(res, filter, { path: 'auteur matiere', select: '-password' }, undefined, pagination, "");
  }

  async getReturnedAssignments(req: Request, res: Response) {
    let filter: any = {};
    let userInfo: any = (req as CustomRequest).userInfo;

    if (userInfo['isAdmin'].toString() === 'true') {
      filter = { note: { $gt: 0 } };
    } else if (userInfo['isProf'].toString() === 'true') {
      const relatedRecords = await new MatiereModel().findMany({ prof: userInfo['id'] }, undefined, { remove: false, fields: ["_id"] });
      filter = {
        $and: [
          { matiere: { $in: relatedRecords } }, { note: { $gt: 0 } }
        ]
      };
    }
    let pagination: IPagination = {
      page: req.query.page ? parseInt(req.query.page.toString()) : undefined,
      PageSize: req.query.pageSize ? parseInt(req.query.pageSize!.toString()) : undefined
    }

    return this.findMany(res, filter, { path: 'auteur matiere', select: '-password' }, undefined, pagination, "");
  }

  deleteAssignmentById(req: Request, res: Response) {
    return this.deleteById(res, req.params.id)
  }
}