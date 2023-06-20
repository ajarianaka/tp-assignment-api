import { Router } from 'express';
import { verifyToken, hasAccess } from '../middleware/auth.middleware';
import {  matiereController } from "../controllers/controllers.module";
export const matieresRouter = Router();

const prefix = '/matiere';

matieresRouter.get('/matieres', hasAccess, (req, res) => { matiereController.getMatieres(req,res) });
matieresRouter.get(prefix + '/:id', verifyToken, (req, res) => { matiereController.findById(res, req.params.id, { path: 'projects' }) });
matieresRouter.post(prefix, verifyToken, (req, res) => { matiereController.createMatiere(req, res) });
matieresRouter.put(prefix + ':id', verifyToken, (req, res) => { matiereController.updateMatiereById(req, res) });
matieresRouter.delete(prefix + '/:id', verifyToken, (req, res) => { matiereController.deleteById(res, req.params.id) });
matieresRouter.get('/matieres', hasAccess, (req, res) => { matiereController.getMatieres(req,res) });

