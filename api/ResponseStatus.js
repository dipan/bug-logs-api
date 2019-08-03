class ResponseStatus {
    static OK(response) {
        return {
            message: response,
            statusCode: 200
        }
    }

    static CREATED(response) {
        return {
            message: response,
            statusCode: 201
        }
    }

    static NO_AUTHENTICATION_TOKEN() {
        return {
            message: {
                developerMessage: "No authentication token provided",
                userMessage: "Provide authentication token"
            },
            statusCode: 401
        }
    }

    static INVALID_AUTHENTICATION_TOKEN() {
        return {
            message: {
                developerMessage: "Invalid authentication token",
                userMessage: "Provide valid authentication token"
            },
            statusCode: 401
        }
    }

    static AUTHENTICATION_TOKEN_EXPIRED() {
        return {
            message: {
                developerMessage: "Authentication token expired",
                userMessage: "Provide new authentication token"
            },
            statusCode: 401
        }
    }

    static NO_DATA_AVAILABLE() {
        return {
            message: {
                developerMessage: "No data available",
                userMessage: "No data available"
            },
            statusCode: 404
        }
    }

    static INTERNAL_SERVER_ERROR(internalError) {
        return {
            message: {
                developerMessage: "Internal server error occurred",
                userMessage: "Internal server error occurred",
                error: internalError
            },
            statusCode: 500
        }
    }
}

module.exports = ResponseStatus;
