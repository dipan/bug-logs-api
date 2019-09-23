## Base URL : [http://35.202.131.196:3000/api](#)

### Public api
### /update/log/:id
* PATCH
    * query
        - __action : Action to be performed. (possible values - incrementViewCount)__

### /log
* GET
    
   
### Base path - /auth/v0
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
