const ArrayList = require('arraylist');
const moment = require('moment');
const MongoDBUtility = require('./../../../mongodb/MongoDBUtility');
const ResponseStatus = require('./../../ResponseStatus');

class LoginUser {
    execute(parameters) {
        let authUserData = parameters.userData;
        let id = authUserData.uid;
        let rolesList = new ArrayList();
        rolesList.add("user");


        let insertUserData = new Object();
        insertUserData["_id"] = id;
        insertUserData["name"] = authUserData.name;
        insertUserData["email"] = authUserData.email;
        insertUserData["emailVerified"] = authUserData.email_verified;
        insertUserData["dpLink"] = authUserData.picture;
        insertUserData["signInProvider"] = authUserData.firebase.sign_in_provider;
        insertUserData["roles"] = rolesList;
        insertUserData["ct"] = moment().valueOf();
        insertUserData["logLimit"] = 500;

        return new Promise(async (resolve, reject) => {
            try {
                let collectionName = "user";
                let mongoDBUtility = new MongoDBUtility();

                let existingUser = await mongoDBUtility.getDataById(collectionName, id);
                let response = new Object();
                if (existingUser === null) {
                    let insertResult = await mongoDBUtility.insertData(collectionName, insertUserData);

                    response["id"] = id;
                    response["message"] = "SignedUp successfully";
                    response["result"] = insertResult.result;
                    response["roles"] = rolesList;
                    resolve(ResponseStatus.CREATED(response));
                } else {
                    response["id"] = existingUser._id;
                    response["message"] = "SignedIn successfully";
                    response["roles"] = existingUser.roles;
                    resolve(ResponseStatus.OK(response));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = LoginUser;
