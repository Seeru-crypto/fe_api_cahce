# UI API cache

## summary

## setup

### develop
1. navitate to project root
2. Run test database and API ``npm run api``
3. Run application ```npm run dev```

## API endpoints

GET  /plates - This retrieves a list of all resource entities of users.
GET /plates/:id - This retrieves a specific user by its id.
POST /plates - This creates a new user.
PUT /plates/:id - This updates a user based on a specified id.
DELETE /plates/:id - This deletes a user based on the specified id.

TODO: 
- add API health check
- add changelog
- update Readme
- 


## Technical notes
- There is a problem with the caching where if, network is re-established then axios will execute all the requests, but if the
- original method has any addition steps to complete then those will not be executed, since the original request has timed out already.

1. Toggle with text interenet is on/ off
2. axios setup for a POST, DELETE and GET requests (generates random number plates AAA-000)
3. implement cache
