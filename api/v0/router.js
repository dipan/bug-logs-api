const express = require('express');
const ResponseStatus = require('./../ResponseStatus');
const PostUser = require('./user/PostUser');
const GetUser = require('./user/GetUsers');

const routerV0 = express.Router();

routerV0.route("/user")
    .post(async (req, res) => {
        console.log("POST API");
        let apiResponse = null;
        try {
            apiResponse = await new PostUser().execute(req, undefined);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    })
    .get((req, res) => {
        let apiResponse = null;
        try {
            apiResponse = new GetUser().execute(req, undefined);
        } catch (error) {
            apiResponse = new Object();
            apiResponse["error"] = error
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    })


module.exports = routerV0