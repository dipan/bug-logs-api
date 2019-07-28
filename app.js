const routerV0 = require('./api/v0/router');
const express = require('express');
const UserAuthenticator = require('./api/auth/UserAuthenticator');
const ResponseStatus = require('./api/ResponseStatus');

const apiRoutes = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/api/spec/buglogV0.html");
});

apiRoutes.use("/", (req, res, next) => {
    let token = req.headers.authorization;
    try {
        console.log(UserAuthenticator.authenticateToken(token.substring("Bearer ".length)));
        next();
        console.log("After next()");
    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.INTERNAL_SERVER_ERROR().statusCode)
            .send(ResponseStatus.INTERNAL_SERVER_ERROR(error).message);
    }
});
apiRoutes.use("/v0", routerV0);

app.use("/api", apiRoutes);

app.listen(port, () => console.log(`Listening on port ${port}!`));