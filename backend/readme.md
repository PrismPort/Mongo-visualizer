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

## Endpoints

### Connect to mongoDB server

- **URL:** `/connect-to-mongodb`
- **Method:** POST
- **Description:** Receives credentials and mongoDB adress and returns a concatenated mongoURL
- **Request Parameters:**
  - in post request body:

  ```json
  {
  "user":"",
  "password":"",
  "adress": "127.0.0.1",
  "port":"27017"
  }
  ```

- **Response:**

  ```json
  {
  "mongoURL": "mongodb://localhost:27017/",
  "message": "Successfully connected to MongoDB"
  }
  ```

### Get a list of available databases

- **URL:** `/query-databases`
- **Method:** GET
- **Description:** Lists all available databases on the server
- **Request Parameters:**
  - None

- **Response:**

  ```json
  [
  "admin",
  "config",
  "local",
  "yourdatabase"
  ]
  ```

### Get a list of available collections in a database

- **URL:** `/query/:database`
- **Method:** GET
- **Description:** Lists all available collections of the specified database
- **Request Parameters:**
  - database [name of the database you want to see collections from]

- **Response:**

  ```json
  [
  "playlists",
  "users"
  ]
  ```

### Analyze a given collection

- **URL:** `/analyze/:database/:collection`
- **Method:** GET
- **Description:** Returns a schema description object _without_ concrete values for every occuring type
- **Request Parameters:**
  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]

- **Response:**

  ```json
  [
      {
        count: 108000, // how many documents have this particullar key?
        type: 'ObjectId', // datatype(s)
        name: '_id', // key name
        probability: 1 // how many documents have this particullar key, but now in percent [0.0, 1.0]
      },
      {
        count: 34529,
        type: [ 'String', 'Undefined' ],
        name: 'address',
        probability: 0.319712962962963
      },
      {
        count: 34360,
        type: [ 'String', 'Undefined' ],
        name: 'company',
        probability: 0.3181481481481481
      },
      {
        count: 34099,
        type: [ 'Date', 'Undefined' ],
        name: 'date',
        probability: 0.3157314814814815
      },
  ...
  ]
  ```

### Query a given collection

- **URL:** `/query/:database/:collection`
- **Method:** POST
- **Description:** Returns a schema description object _with_ concrete values for every occuring type
- **Request Parameters:**
  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]
  - mongo query in post request body:

  ```json
  { 
    "$and": [ 
    { "email": { "$exists": true } }, 
    { "name": { "$exists": true } }, 
    { "company": { "$exists": true } } 
    ] 
  }
  ```

- **Response:**

  ```json
  [
      {
        count: 108000, // how many documents have this particullar key?
        type: 'ObjectId', // datatype(s)
        name: '_id', // key name
        probability: 1, // how many documents have this particullar key, but now in percent [0.0, 1.0]
        types: { ObjectId: [Array] } // every datatype of the given key and an array with all occuring concrete values for this particular key
      },
      {
        count: 34529,
        type: [ 'String', 'Undefined' ],
        name: 'address',
        probability: 0.319712962962963,
        types: { String: [Array], Undefined: undefined }
      },
      {
        count: 34360,
        type: [ 'String', 'Undefined' ],
        name: 'company',
        probability: 0.3181481481481481,
        types: { String: [Array], Undefined: undefined }
      },
      {
        count: 34099,
        type: [ 'Date', 'Undefined' ],
        name: 'date',
        probability: 0.3157314814814815,
        types: { Date: [Array], Undefined: undefined }
      },
  ...
  ]
  ```
