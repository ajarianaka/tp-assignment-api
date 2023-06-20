import { Router } from 'express';
import { hasValidToken, hasAccess } from '../middleware/auth.middleware';
import { assignmentController } from "../controllers/controllers.module";
export const assignmentsRouter = Router();

const prefix = '/assignment';

assignmentsRouter.get('/matiere/:id/assignments', hasAccess, (req, res) => { assignmentController.getAssignmentsByMatiere(req, res) });
assignmentsRouter.get('/assignments/', hasValidToken, (req, res) => { assignmentController.getAssignments(req, res) });
assignmentsRouter.get(prefix + '/:id', hasValidToken, (req, res) => { assignmentController.findById(res, req.params.id) });
assignmentsRouter.post('/assignments/:id', hasAccess, (req, res) => { assignmentController.createAssigments(req, res) });
assignmentsRouter.put(prefix + ':id', hasValidToken, (req, res) => { assignmentController.updateAssignmentById(req, res) });
assignmentsRouter.delete(prefix + '/:id', hasValidToken, (req, res) => { assignmentController.deleteById(res, req.params.id) });
assignmentsRouter.put('/assignment/:id/soumettre', hasValidToken, (req, res) => { assignmentController.submitAssignmentById(req, res) });
assignmentsRouter.put('/assignment/:id/noter', hasValidToken, (req, res) => { assignmentController.markAssignmentById(req, res) });
assignmentsRouter.get('/submitted-assignments/', hasAccess, (req, res) => { assignmentController.getSubmittedAssignments(req, res) });
assignmentsRouter.get('/returned-assignments/', hasAccess, (req, res) => { assignmentController.getReturnedAssignments(req, res) });
