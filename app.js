const routerV0 = require('./api/v0/router');
const express = require('express');
const Utility = require('./utility/Utility');
const UserAuthenticator = require('./api/auth/UserAuthenticator');
const ResponseStatus = require('./api/ResponseStatus');

const apiRoutes = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", (req, res, next) => {
    console.log(req.httpVersionMajor);
    console.log(req.httpVersionMinor);
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.originalUrl);
    console.log(req.baseUrl);
    console.log(req.url);
    console.log(req.headers);
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    // console.log(res);

    next();
});

app.get('/', async function (req, res) {
    res.sendFile(__dirname + "/api/spec/buglogV0.html");
});

apiRoutes.use("/", (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (Utility.isStringEmptyOrUndefined(token)) {
            let responseStatus = ResponseStatus.NO_AUTHENTICATION_TOKEN();
            res.status(responseStatus.statusCode)
                .send(responseStatus.message);
        } else {
            console.log(UserAuthenticator.authenticateToken(token.substring("Bearer ".length)));
            next();
        }
    } catch (error) {
        console.log(error);
        let responseStatus;
        if (error.name === "JsonWebTokenError") {
            responseStatus = ResponseStatus.INVALID_AUTHENTICATION_TOKEN();
        } else {
            responseStatus = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        }
        res.status(responseStatus.statusCode)
            .send(responseStatus.message);
    }
});
apiRoutes.use("/v0", routerV0);

app.use("/api/auth", apiRoutes);

app.use("/api", (req, res, next) => {
    res.status(200).send("No authentication required");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));