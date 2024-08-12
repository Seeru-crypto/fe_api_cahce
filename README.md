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

_or via script (on windows machines) `.\start_dev.bat`_


## JSON server API endpoints

```
GET  /plates - This retrieves a list of all resource entities of users.
GET /plates/:id - This retrieves a specific user by its id.
POST /plates - This creates a new user.
PUT /plates/:id - This updates a user based on a specified id.
DELETE /plates/:id - This deletes a user based on the specified id.
```

## Technical notes

- Detecting and caching the requests was rather straightforward
- A problem arose when the requests were supposed to be re-sent. Since the original function call´s request would be timed-out, therefore cancelling any additional logic
- A rather bad solution was created, using axios middleware, which detects if successful requests were sent out and if they were POST or DELETE
then additional side-effect logic was executed. This is fine in smaller projects, but not viable in middle sized or larger projects.
