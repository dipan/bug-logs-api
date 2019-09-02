const express = require('express');
const ResponseStatus = require('../ResponseStatus');
const Update = require('./Update');

const routerCom = express.Router();

routerCom.route("/update/:collection")
    .put(async (req, res) => {
        let apiResponse = null;
        try {
            apiResponse = await new Update().execute(req);
        } catch (error) {
            console.log(error);
            apiResponse = ResponseStatus.INTERNAL_SERVER_ERROR(error);
        } finally {
            res.status(apiResponse.statusCode).send(apiResponse.message);
        }
    });

module.exports = routerCom;