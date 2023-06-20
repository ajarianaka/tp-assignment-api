import { UserController } from './user.controller'
//import { ProjectController } from './project.controller'
import { MatiereController } from './matiere.controller'
import { AssignmentController } from './assignment.controller';
export const userController = new UserController();
//export const projectController = new ProjectController();
export const matiereController = new MatiereController();
export const assignmentController = new AssignmentController();