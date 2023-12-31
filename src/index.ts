import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import connect from './connect';
import { env } from "./environment/env";
import { usersRouter } from "./routes/user.route";
import { assignmentsRouter } from "./routes/assignment.route";
import { matieresRouter } from './routes/matiere.route';


const app: Application = express();
const port: number = env().port ?? 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-token,x-access-token,Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Expose-Headers","x-token");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

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

let routes = [usersRouter, matieresRouter, assignmentsRouter];

routes.forEach((route) => {
  app.use(`${env().apiPath}`, route);
});