const routerV0 = require('./api/v0/router');
const routerCom = require('./api/com/router');
const express = require('express');
const Utility = require('./utility/Utility');
const UserAuthenticator = require('./api/auth/UserAuthenticator');
const ResponseStatus = require('./api/ResponseStatus');

const authAPIRoutes = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", (req, res, next) => {
    console.log("Version : " + req.httpVersion);
    console.log("Major version : " + req.httpVersionMajor);
    console.log("Minor version : " + req.httpVersionMinor);
    console.log("Method : " + req.method);
    console.log("Original URL : " + req.originalUrl);
    console.log("Base URL : " + req.baseUrl);
    console.log("URL : " + req.url);
    console.log("Headers : " + JSON.stringify(req.headers, null, 2));
    console.log("Params : " + JSON.stringify(req.params, null, 2));
    console.log("Query : " + JSON.stringify(req.query, null, 2));
    console.log("Body : " + JSON.stringify(req.body, null, 2));
    // console.log(res);

    next();
});

app.get('/', async function (req, res) {
    res.json("Home");
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
        console.log(error);
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

app.listen(port, () => console.log(`Listening on port ${port}!`));