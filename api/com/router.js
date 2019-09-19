const express = require('express');
const ResponseStatus = require('../ResponseStatus');
// const Update = require('./Update');
const PublicUpdate = require('./PublicUpdate');
const GetLogs = require('../v0/log/GetLogs');

const routerCom = express.Router();

// routerCom.route("/update/:collection")
//     .put(async (req, res) => {
//         let apiResponse = null;
//         try {
//             apiResponse = await new Update().execute(req);
//         } catch (error) {
//             console.log(error);
//             apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
//         } finally {
//             res.status(apiResponse.statusCode).send(apiResponse.message);
//         }
//     });

routerCom.route("/update/:collection/:id")
    .patch(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new PublicUpdate().execute(req);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

routerCom.route("/log")
    .get(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new GetLogs().execute(req);
        } catch (error) {
            Logger.error(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

module.exports = routerCom;