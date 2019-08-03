const express = require('express');
const ResponseStatus = require('./../ResponseStatus');
const LoginUser = require('./user/LoginUser');
const PostUser = require('./user/PostUser');
const GetUser = require('./user/GetUsers');

const routerV0 = express.Router();

routerV0.route("/login")
    .post(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new LoginUser().execute(req);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

routerV0.route("/user")
    .post(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new PostUser().execute(req);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    })
    .get(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new GetUser().execute(req);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });


module.exports = routerV0