import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import connect from './connect';
import { env } from "./environment/env";
import { usersRouter } from "./routes/user.route";
//import { projectsRouter } from "./routes/project.route";
import { assignmentRouter } from "./routes/assignment.route";
import { matieresRouter } from './routes/matiere.route';


const app: Application = express();
const port: number = env().port ?? 8080;
//const port =  process.env.PORT ||8010;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-token,x-access-token,x-project-id,Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Expose-Headers","x-token");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req: Request, res: Response) =>
  res.send('Bienvenue dans assigment API')
);

app.listen(port, () =>
  console.log(`Application started successfully on port ${port}.`)
);
let dbConString = env().db.uri(
  env().db.user,
  env().db.pw,
  env().db.name,
  env().db.account
);

connect({ db: dbConString });

let routes = [usersRouter, matieresRouter, assignmentRouter];
//routes({ app });

routes.forEach((route) => {
  app.use(`${env().apiPath}`, route);
});