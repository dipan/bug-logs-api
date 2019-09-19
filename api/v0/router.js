const express = require('express');
const ResponseStatus = require('./../ResponseStatus');
const Logger = require('../../com/Logger');

const LoginUser = require('./user/LoginUser');
const PostUser = require('./user/PostUser');
const GetUsers = require('./user/GetUsers');
const GetUser = require('./user/GetUser');
const PostLog = require('./log/PostLog');
const GetLogs = require('./log/GetLogs');
const GetUserLog = require('./log/GetUserLog');
const PutUser = require('./user/PutUser');

const routerV0 = express.Router();

routerV0.route("/login")
    .post(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new LoginUser().execute(req);
        } catch (error) {
            Logger.error(error);
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
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    })
    .get(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new GetUsers().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    })
    .put(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new PutUser().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

routerV0.route("/user/:userId")
    .get(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new GetUser().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

routerV0.route("/user-log")
    .get(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new GetUserLog().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

routerV0.route("/log")
    .post(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new PostLog().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });
    // .get(async (req, res) => {
    //     let apiResponse = null;
    //     try {
    //         apiResponse = await new GetLogs().execute(req);
    //     } catch (error) {
    //         Logger.error(error);
    //         apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
    //     } finally {
    //         res.status(apiResponse.statusCode).send(apiResponse.message);
    //     }
    // });

module.exports = routerV0;