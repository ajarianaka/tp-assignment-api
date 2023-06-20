import { Router } from 'express';
import { hasValidToken, hasAccess, isAdmin } from '../middleware/auth.middleware';
import { userController } from "../controllers/controllers.module";
export const usersRouter = Router();

const prefix = '/user';

usersRouter.get('/users', hasAccess, (req, res) => { userController.getUserList(req, res) });
usersRouter.get(prefix + '/:id', hasValidToken, (req, res) => { userController.findById(res, req.params.id, undefined,{remove:true,fields:["password"]}) });
usersRouter.post(prefix, isAdmin, (req, res) => { userController.createUser(req, res) });
usersRouter.put(prefix + '/:id', hasValidToken, (req, res) => { userController.updateUserById(req, res) });
usersRouter.delete(prefix + '/:id', isAdmin, (req, res) => { userController.deleteById(res, req.params.id) });
usersRouter.post('/user/login', (req, res) => { userController.login(req, res) });
usersRouter.get('/etudiants', hasAccess, (req, res) => { userController.getStudents(req, res) });
usersRouter.get('/profs', isAdmin, (req, res) => { userController.getProfs(req, res) });
