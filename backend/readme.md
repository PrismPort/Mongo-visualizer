# Visual MongoDB Backend

The Backend is used to communicate to a mongoDB server through the official mongoDB nodejs driver.

## Usage

## Base URL

- The base URL for the API is: `http://localhost:4000/`

## Authentication

- All requests, except `/connect-to-mongodb` require a mongoDB URL in the header

```javascript
  headers: {
    'Content-Type': 'application/json',
    'mongoURL': mongoURL as string,
  },
```

Endpoints
Connect to MongoDB Server
URL: /connect-to-mongodb

Method: POST

Description: Connect to a MongoDB server using provided credentials and configuration.

Request Parameters:

In the post request body:
json
Copy code
{
  "username": "",
  "password": "",
  "address": "127.0.0.1",
  "port": "27017"
}
Response:

json
Copy code
{
  "message": "Successfully connected to MongoDB"
}
Logout from MongoDB Server
URL: /disconnect-mongodb

Method: GET

Description: Disconnect from the MongoDB server if connected.

Request Parameters:

None
Response:

json
Copy code
{
  "message": "Successfully disconnected from MongoDB"
}
Get a List of Available Databases
URL: /query-databases

Method: GET

Description: Lists all available databases on the MongoDB server.

Request Parameters:

None
Response:

json
Copy code
[
  "admin",
  "config",
  "local",
  "yourdatabase"
]
Get a List of Available Collections in a Database
URL: /query/:database

Method: GET

Description: Lists all available collections in the specified database.

Request Parameters:

database (name of the database)
Response:

json
Copy code
[
  "playlists",
  "users"
]
Get Documents from a Collection
URL: /query/:database/:collection/:limit

Method: GET

Description: Retrieves documents from a collection with a specified limit.

Request Parameters:

database (name of the database)
collection (name of the collection)
limit (maximum number of documents to retrieve)
Response:

json
Copy code
[
  // Retrieved documents
]
Analyze a Collection
URL: /analyze/:database/:collection

Method: GET

Description: Provides a schema description for a given collection without concrete values for each type.

Request Parameters:

database (name of the database)
collection (name of the collection)
Response:

json
Copy code
[
  // Schema description
]
Query a Collection
URL: /query/:database/:collection

Method: POST

Description: Provides a schema description for a given collection with concrete values for each type based on a specified query.

Request Parameters:

database (name of the database)
collection (name of the collection)
MongoDB query in the post request body:
json
Copy code
{ 
  "$and": [ 
    { "email": { "$exists": true } }, 
    { "name": { "$exists": true } }, 
    { "company": { "$exists": true } } 
  ] 
}
Response:

json
Copy code
[
  // Schema description with concrete values
]
Get Document Count for a Key
URL: /count/:database/:collection/:key

Method: GET

Description: Retrieves the count of documents that have a specific key in a collection.

Request Parameters:

database (name of the database)
collection (name of the collection)
key (name of the key to count)
Response:

json
Copy code
{
  "key": "",
  "count": 0
}
Get Unique Values for a Key
URL: /unique-values/:database/:collection/:key

Method: GET

Description: Retrieves unique values and their counts for a specific key in a collection.

Request Parameters:

database (name of the database)
collection (name of the collection)
key (name of the key to get unique values for)
Response:

json
Copy code
[
  {
    "_id": "",
    "count": 0
  }
]
Get Value Distribution for a Key
URL: /value-distribution/:database/:collection/:key

Method: GET

Description: Retrieves the distribution of values for a specific key in a collection, including percentages.

Request Parameters:

database (name of the database)
collection (name of the collection)
key (name of the key to get value distribution for)
Response:

json
Copy code
[
  {
    "value": "",
    "percentage": 0
  }
]
Environment Configuration
Additionally, there's an .env.local file that contains configuration variables for the MongoDB URL, Express port, client origin, and Docker usage.

ini
Copy code
# MongoDB url string
MONGO_URL=localhost
MONGO_PORT=5001
DB_NAME=admin
MONGO_USER=null
MONGO_PASS=null

# Express config
EXPRESS_PORT=4000

# Client-side config
CLIENT_ORIGIN="http://localhost:3000"

# Docker config
DOCKER="true" # Set to false if
