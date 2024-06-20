import express, { NextFunction, Request, Response } from "express";
import { config } from './config';
import { DBInstance as DB } from '@common/services/DBService';
import helmet from 'helmet';
import cors from 'cors';
import { AppRoute } from "@src/router";
import { ApiResponse } from "@common/helpers/ApiResponse";
import { SERVER_ERROR_CODE_500 } from "@common/constants/HTTP_CODE";
import { JwtAuth } from "@common/services/PassportService";
export * from './common/models';

const app = express();
const PORT = config.port ;


app.use(helmet());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static('uploads'));


/**
 * app oute
 */
app.use("/api/v1", AppRoute);

/**
 * Auth to database
 */

DB.authenticate()
.then(async () => {
  await DB.sync({ alter: false });
  console.log(`► ${config.dbDialect}: connected .....☪☻✔️`);
})
.catch((e: any) => console.log(`${config.dbDialect} : Not connected ️❌️`, e));
app.route("/").get((req: Request, res: Response, next: NextFunction) => res.sendStatus(200));

JwtAuth().catch(err => {
  console.error(err);
});

/**
 * route not found
 */
app.all("/**", (req: Request, res: Response) =>
  res.status(404).send("Page not found ")
);

/**
 * handle global error app 
 */
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {

  console.log(err)
  return ApiResponse(res,SERVER_ERROR_CODE_500,false, "Server error"+err)
});
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
