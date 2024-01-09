# Visual MongoDB Backend

The Backend is used to communicate with a MongoDB server through the official MongoDB Node.js driver.

## Table of Contents

1. [Usage](#usage)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
   - [Connect to MongoDB Server](#connect-to-mongodb-server)
   - [Logout from MongoDB Server](#logout-from-mongodb-server)
   - [Get a List of Available Databases](#get-a-list-of-available-databases)
   - [Get a List of Available Collections in a Database](#get-a-list-of-available-collections-in-a-database)
   - [Get Documents from a Collection](#get-documents-from-a-collection)
   - [Analyze a Collection](#analyze-a-collection)
   - [Query a Collection](#query-a-collection)
   - [Get Document Count for a Key](#get-document-count-for-a-key)
   - [Get Unique Values for a Key](#get-unique-values-for-a-key)
4. [Environment Configuration](#environment-configuration)

## Usage

### Base URL

The base URL for the API is: `http://localhost:4000/`

### Authentication

JWT authentication has been implemented. All sensitive routes are protected and require a valid JWT token.

In order to

### Endpoints

#### Connect to MongoDB Server

- **URL:** `/connect-to-mongodb`
- **Method:** POST
- **Description:** Receives credentials and MongoDB address, establishes a connection to a Mongo Client instance.
- **Request Parameters:**

  ```json
  {
    "user": "",
    "password": "",
    "address": "127.0.0.1",
    "port": "27017"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Successfully connected to MongoDB"
  }
  ```

#### Logout from MongoDB Server

- **URL:** `/disconnet-mongodb`
- **Method:** GET
- **Description:** Calls a logout function in database.controller that disconnects the Mongo client instance.
- **Request Parameters:**

  - None

- **Response:**

  ```json
  {
    "message": "Successfully disconnected from mongoDB"
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
  ["admin", "config", "local", "yourdatabase"]
  ```

### Get a list of available collections in a database

- **URL:** `/query/:database`
- **Method:** GET
- **Description:** Lists all available collections of the specified database
- **Request Parameters:**

  - database [name of the database you want to see collections from]

- **Response:**

  ```json
  ["playlists", "users"]
  ```

### Get documents from a collection

- **URL:** `/query/:database/:collection/:limit`
- **Method** GET
- **Description:** Returns an array of documents including all their key value Pairs for a specified database and collection
- **Request Parameters:**

  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]
  - limit [limit of documents to return from collection]

- **Response**

  ```json
  [
    {
      class: 6, //
      dob:  "1260792432000",
      first_name: "Colver",
      gender: "male",
      last_name: "Stollwerk",
    },
    {
      class: 2, //
      dob:  "1033508542000",
      first_name: "Emil",
      gender: "male",
      last_name: "Peters",},
    {
      class: 10, //
      dob:  "1047815470000",
      first_name: "Jana",
      gender: "female",
      last_name: "Winter",
      },
    ...
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

### Query a collection

- **URL:** `/query/:database/:collection`
- **Method:** POST
- **Description:** Returns a schema description object _with_ concrete values for every occuring type
- **Request Parameters:**

  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]

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

### Get document count for a Key

- **URL:** `/documentcount/:database/:collection/:key`
- **Method:** GET
- **Description:** Returns the number of documents that contain the given key of a collection
- **Request Parameters:**

  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]
  - key [name of the key to get the count for]

- **Response:**

  ```json
  {
    "count": 200, // how many documents have this particullar key?
    "key": "gender" // datatype(s)
  }
  ```

### Get unique values for a Key

- **URL:** `/uniquevalues/:database/:collection/:key`
- **Method:** GET
- **Description:** Returns the unique values of a given key in a collection and their counts

- **Request Parameters:**

  - database [name of the database where the collection is from]
  - collection [collection to be analyzed]
  - key [name of the key to get the count for]

- **Response:**

  ```json
   [

      {
        _id: "Male",
        count: 104
      }

      {
        _id: "female",
        count: 96
      },
  ...
  ]
  ```

### Environment Configuration

Additionally, there's an env_temp file that needs to be renamed to .env.local. It contains configuration variables for the MongoDB URL, Express port, client origin, and Docker usage.

```env

# MongoDB url string

MONGO_URL=localhost
MONGO_PORT=5001
DB_NAME=admin
MONGO_USER=null
MONGO_PASS=null

# Express config

EXPRESS_PORT=4000

# clientside config

CLIENT_ORIGIN="http://localhost:3000" # add the url fo the frontend

# Docker config

DOCKER="true" # Set to false if not using Docker

```
