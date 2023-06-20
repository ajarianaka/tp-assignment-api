import { Router } from 'express';
import { verifyToken, hasAccess } from '../middleware/auth.middleware';
import { assignmentController } from "../controllers/controllers.module";
export const assignmentRouter = Router();

const prefix = '/assignment';

assignmentRouter.get('/transactions', hasAccess, (req, res) => { assignmentController.getAssignments(req, res) });
assignmentRouter.get(prefix + '/:id', verifyToken, (req, res) => { assignmentController.findById(res, req.params.id, { path: 'projects' }) });
assignmentRouter.post(prefix, hasAccess, (req, res) => { assignmentController.createAssigments(req, res) });
assignmentRouter.put(prefix + ':id', verifyToken, (req, res) => { assignmentController.updateAssignmentById(req, res) });
assignmentRouter.delete(prefix + '/:id', verifyToken, (req, res) => { assignmentController.deleteById(res, req.params.id) });
