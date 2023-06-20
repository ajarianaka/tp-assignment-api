import { exit } from "process";
import { IEnv } from "../interfaces/IEnv";
export { IEnv } from "../interfaces/IEnv";

export const env: () => IEnv = () => {
  console.log(process.env.ENVIRONMENT)
  if (process.env.ENVIRONMENT === "dev") {
    let env = require("./dev").ENV;
    return env;
  } else if (process.env.ENVIRONMENT === "prod") {
    let env = require("./prod").ENV;
    return env;
  } else {
    console.log(
      `Error. shell variable ENVIRONMENT not set. Acceptable values are 'dev' | 'production'`
    );
    exit(1);
  }
};