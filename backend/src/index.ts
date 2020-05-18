import express from "express";
import cors from "cors";
import helmet from "helmet";
import expressPino from "express-pino-logger";
import bodyParser from "body-parser";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("pino")();

import routes from "./routes";
import { app as appConfig } from "./config";
import { jwtMiddleware } from "./services/jwt";
import { defaultErrorHandler } from "./error";

const app: express.Application = express();
app.locals.name = appConfig.name;
app.locals.version = appConfig.version;

const ep = expressPino({
    logger,
} as any);
app.use(ep);
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(jwtMiddleware());

app.use("/", routes);
app.use(defaultErrorHandler);

app.listen(appConfig.port, () => {
    logger.info(`Servidor rodando em http://${appConfig.host}:${appConfig.port}`);
});
