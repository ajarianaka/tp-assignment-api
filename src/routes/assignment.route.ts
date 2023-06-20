import { Router } from 'express';
import { verifyToken, hasAccess } from '../middleware/auth.middleware';
import { assignmentController } from "../controllers/controllers.module";
export const assignmentRouter = Router();

const prefix = '/assignment';

assignmentRouter.get('/assignments/:id', hasAccess, (req, res) => { assignmentController.getAssignments(req, res) });
assignmentRouter.get(prefix + '/:id', verifyToken, (req, res) => { assignmentController.findById(res, req.params.id, { path: 'projects' }) });
assignmentRouter.post('/assignments/:id', hasAccess, (req, res) => { assignmentController.createAssigments(req, res) });
assignmentRouter.put(prefix + ':id', verifyToken, (req, res) => { assignmentController.updateAssignmentById(req, res) });
assignmentRouter.delete(prefix + '/:id', verifyToken, (req, res) => { assignmentController.deleteById(res, req.params.id) });
assignmentRouter.put('/assignment/:id/soumettre', verifyToken, (req, res) => { assignmentController.submitAssignmentById(req, res) });
assignmentRouter.put('/assignment/:id/noter', verifyToken, (req, res) => { assignmentController.markAssignmentById(req, res) });
assignmentRouter.get('/submitted-assignments/:id', hasAccess, (req, res) => { assignmentController.getAssignments(req, res) });
assignmentRouter.get('/returned-assignments/:id', hasAccess, (req, res) => { assignmentController.getAssignments(req, res) });
