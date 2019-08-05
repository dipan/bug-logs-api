## Base URL : [http://35.202.175.54:3000/api](#)

### /login
* POST
    * headers
        - __authorization : Bearer token__
        - content-type : application/json
    

### /user
* POST
    * *under development*
* GET
    * response : 
```
  [
    {
      "_id": "string",
      "name": "string",
      "email": "string",
      "emailVerified": boolean,
      "dpLink": "string",
      "signInProvider": "string",
      "roles": array,
      "ct": long 
    }
  ]
```

### /user/:userId
* GET
    * path
        * __userId : valid user id__
    * query
        * projection : fields to fetch, comma separated field names
