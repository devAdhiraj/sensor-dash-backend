# sensor-dash-backend

This is an API used to access, add, and delete the sensor data stored in a MongoDB Database.
The API is hosted on [https://ad-sensor-dash.herokuapp.com](https://ad-sensor-dash.herokuapp.com).

Git Repo for device code: [https://github.com/devAdhiraj/sensor-dash-device-code](https://github.com/devAdhiraj/sensor-dash-device-code)\
Git Repo for frontend React App: [https://github.com/devAdhiraj/sensor-dash-frontend](https://github.com/devAdhiraj/sensor-dash-frontend)

## Accessing Data
GET Request\
Data can be accessed by anyone using the /api/sensors route. This will send all the sensor data entries
in json. 
This route also allows for querying.

### Allowed Query Params:
 * empty - all data in DB will be included in response
 * select - fields that will be included in response
 * sort - (updatedAtx | tempx | humidx | lightx) - data will be sorted based 
 * on given value, x = 0 or 1 --> temp0 - lowest first | temp1 - highest first
 * limit - limits number of entries in response
 * skip - skips specified number of elements
 * rangeStart - min date range of entries returned (ISO String format)
 * rangeEnd - max date range of entries returned (ISO String format)

Last data entry can be accessed by /api/sensors/last. This will return only one data entry (latest one).
A specific data entry can be fetched by /api/sensors/:id

## Adding Data 
Data can be added using a POST request at the route /api/sensors/add. However, this requires a valid jwt access token or a secret
API key header. Hence, this is intended to be an admin only action.
The expected payload is a value for humid, temp, and light. If all fields are defined, the entry will be added to the database.

## Deleting data.
Data can be deleted using a DELETE request at route /api/sensors. This also requires a valid jwt access token or a
secret API key header. Hence, this is intended to be an admin only action.
The expected payload is an array of ids. All the entries with matching ids will be deleted from the database.

## Admin Auth
The admin can login by providing credentials (username and password) as payload to the route /api/sensors/admin-auth.
If credentials are valid, the user will get a jwt token in response that will stay valid for 40 mins after which they will
be required to log in again. The jwt access token can be used to add and delete data.

<img src="https://user-images.githubusercontent.com/75645547/148711800-e9807fc2-c40e-4524-9015-29330bacdc12.png" width=300>

<img src="https://user-images.githubusercontent.com/75645547/148711836-060628ac-203e-4b19-bd98-c7a21066adf3.png" width=300>
