# UI API cache

## summary
A simple application to develop a front-end request cache for the event of a network outage on the client side. 

The solution detects internet outage, and caches all requests sent in localstorage. 
Once internet connection is restored, the requests will be sent out in the same order. 

Axios and redux were used in the implementation and the current solution is limited to small projects, due
to the inherit limitations to the solution (read more in the technical notes below)
## setup

### develop
1. navigate to project root
2. Run test database and API ``npm run api``
3. Run application ```npm run dev```

or via script (on windows machines)
``.\start_dev.bat``


## JSON server API endpoints

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

- Detecting and caching the requests was rather straightforward
- A problem arose when the requests were supposed to be re-sent. Since the original function call´s request would be timed-out 
- Therefore, cancelling any additional logic
- A rather bad solution was to create a axios middleware, which catches successful requests sent out and if they were POST or DELETE
then a automatic GET request would be sent out. fine in smaller projects, but not viable in larger.