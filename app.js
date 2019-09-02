process.env.NODE_ENV = process.argv[2] || "development";
const routerV0 = require('./api/v0/router');
const routerCom = require('./api/com/router');
const express = require('express');
const Utility = require('./utility/Utility');
const UserAuthenticator = require('./api/auth/UserAuthenticator');
const ResponseStatus = require('./api/ResponseStatus');
const Logger = require('./com/Logger');

const authAPIRoutes = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", (req, res, next) => {
    Logger.info(getRequestObject(req));

    next();
});

app.get('/', async function (req, res) {
    res.sendFile(__dirname + "/api/spec/buglogV0.html");
});

authAPIRoutes.use("/", (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (Utility.isStringEmptyOrUndefined(token)) {
            let responseStatus = ResponseStatus.NO_AUTHENTICATION_TOKEN();
            res.status(responseStatus.statusCode)
                .send(responseStatus.message);
        } else {
            token = UserAuthenticator.authenticateToken(token.substring("Bearer ".length));
            req["userData"] = token.userData;
            next();
        }
    } catch (error) {
        Logger.error(getRequestObject(req));
        Logger.error(error);
        let responseStatus;
        if (error.name === "JsonWebTokenError") {
            responseStatus = ResponseStatus.INVALID_AUTHENTICATION_TOKEN();
        } else if (error.name === "TokenExpiredError") {
            responseStatus = ResponseStatus.AUTHENTICATION_TOKEN_EXPIRED();
        } else {
            responseStatus = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        }
        res.status(responseStatus.statusCode)
            .send(responseStatus.message);
    }
});
authAPIRoutes.use("/v0", routerV0);

app.use("/api/auth", authAPIRoutes);

app.use("/api", routerCom);

app.listen(port, () => Logger.info(`${process.env.NODE_ENV} environment : Listening on port ${port}!`));

function getRequestObject(req) {
    let logObject = {};
    logObject["version"] = req.httpVersion;
    logObject["majorVersion"] = req.httpVersionMajor;
    logObject["minorVersion"] = req.httpVersionMinor;
    logObject["method"] = req.method;
    logObject["originalURL"] = req.originalUrl;
    logObject["baseURL"] = req.baseUrl;
    logObject["url"] = req.url;
    logObject["headers"] = req.headers;
    logObject["params"] = req.params;
    logObject["query"] = req.query;
    logObject["body"] = req.body;

    return logObject;
}
