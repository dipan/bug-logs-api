const jwt = require('jsonwebtoken');
const jwtConfig = require('./config');

class UserAuthenticator {
    // instance = new UserAuthenticator();

    constructor() {
        this.instance = null;
    }

    static getInstance() {
        if (this.instance === undefined) {

            return new UserAuthenticator();
        }
        return this.instance;
    }

    static authenticateToken(token) {
        let decoded = jwt.verify(token, jwtConfig.jwtKey, { algorithm: 'HS256' });
        console.log("Decoded token : " + JSON.stringify(decoded, null, 2));
        return decoded;
    }
}

module.exports = UserAuthenticator;