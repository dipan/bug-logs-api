new Vue({
    el: '#vue-app',
    data: {
        rest_api: [
            {
                method: "GET",
                uri_pattern: "/admin/users",
                version: 0,
                description: "Get list of admin users",
                parameters: [],
                response: [
                    {
                        statusCode: 200,
                        description: "OK",
                        message:
                        {
                            adminUsers: [
                                {
                                    _id: "string",
                                    addr: "string",
                                    email: "string",
                                    name: "string",
                                    phone: "number"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                method: "GET",
                uri_pattern: "/admin/users/:id",
                version: 0,
                description: "Get admin user details",
                parameters: [],
                response: [
                    {
                        statusCode: 200,
                        description: "OK",
                        message:
                        {
                            adminUser:
                            {
                                _id: "string",
                                addr: "string",
                                email: "string",
                                name: "string",
                                phone: "number"
                            }
                        }
                    }
                ]
            },
            {
                method: "POST",
                uri_pattern: "/admin/users",
                version: 0,
                description: "Post a new admin user",
                parameters: [
                    {
                        name: "name",
                        type: "header",
                        isRequired: true,
                        description: "Full name of user"
                    },
                    {
                        name: "email",
                        type: "header",
                        isRequired: true,
                        description: "E-Mail address of user"
                    },
                    {
                        name: "addr",
                        type: "form",
                        isRequired: false,
                        description: "E-Mail address of user"
                    },
                    {
                        name: "phone",
                        type: "header",
                        isRequired: false,
                        description: "Phone number of user"
                    }
                ],
                response: [
                    {
                        statusCode: 201,
                        description: "CREATED",
                        message:
                        {
                            _id: "string",
                            message: "Post Successful"
                        }
                    }
                ]
            }
        ]
    },
    methods: {
        getHttpMethodClass: function (httpMethod) {
            var borderClass;
            var methodClass;
            switch (httpMethod) {
                case 'DELETE':
                    return {
                        borderClass: "border-danger",
                        methodClass: "bg-danger"
                    }
                case 'GET':
                    return {
                        borderClass: "border-primary",
                        methodClass: "bg-primary"
                    }
                case 'PATCH':
                    return {
                        borderClass: "border-info",
                        methodClass: "bg-info"
                    }
                case 'POST':
                    return {
                        borderClass: "border-success",
                        methodClass: "bg-success"
                    }
            }
            return methodClass;
        },
        isGetMethod: function (httpMethod) {
            return (httpMethod === "GET");
        },
        isPatchMethod: function (httpMethod) {
            return (httpMethod === "PATCH");
        },
        isPostMethod: function (httpMethod) {
            return (httpMethod === "POST");
        },
        isDeleteMethod: function (httpMethod) {
            return (httpMethod === "DELETE");
        }
    }
});