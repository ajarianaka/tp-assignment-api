import { Router } from 'express';
import { verifyToken, hasAccess } from '../middleware/auth.middleware';
import { userController } from "../controllers/controllers.module";
export const usersRouter = Router();

const prefix = '/user';

usersRouter.get('/users', hasAccess, (req, res) => { userController.getUserList(res) });
usersRouter.get(prefix + '/:id', verifyToken, (req, res) => { userController.findById(res, req.params.id, { path: 'projects' }) });
usersRouter.post(prefix, verifyToken, (req, res) => { userController.createUser(req, res) });
usersRouter.put(prefix + ':id', verifyToken, (req, res) => { userController.updateUserById(req, res) });
usersRouter.delete(prefix + '/:id', verifyToken, (req, res) => { userController.deleteById(res, req.params.id) });
usersRouter.post('/user/login', (req, res) => { userController.login(req, res) });