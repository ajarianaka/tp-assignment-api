import { Router } from 'express';
import { hasValidToken, hasAccess, isAdmin } from '../middleware/auth.middleware';
import {  matiereController } from "../controllers/controllers.module";
export const matieresRouter = Router();

const prefix = '/matiere';

matieresRouter.get('/matieres', hasAccess, (req, res) => { matiereController.getMatieres(req,res) });
matieresRouter.get(prefix + '/:id', hasValidToken, (req, res) => { matiereController.findById(res, req.params.id, { path: 'projects' }) });
matieresRouter.post(prefix, isAdmin, (req, res) => { matiereController.createMatiere(req, res) });
matieresRouter.put(prefix + ':id', hasAccess, (req, res) => { matiereController.updateMatiereById(req, res) });
matieresRouter.delete(prefix + '/:id', isAdmin, (req, res) => { matiereController.deleteById(res, req.params.id) });