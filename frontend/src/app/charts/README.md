# Charts

A chart is made up out of a *subset* of *data*. Each *subset* is displayed as a single chart.

## This is a subset

```javascript
const a_subset = {
  count: 14,
  type: "Number",
  name: "age",
  probability: 1,
  types: [{
    name: "Number",
    path: ["age"],
    count: 14,
    probability: 1,
    unique: 8,
    hasDuplicates: true,
    values: [30, 28, 35, 33, 31, 40, 29, 27, 30, 28, 35, 33, 31, 40],
    bsonType: "Number"
  }]
}; 
```

## This is a subset, too

```javascript
{
  count: 14,
  type: "Document",
  name: "address",
  probability: 1,
  types: [{
    name: "Document",
    path: ["address"],
    count: 14,
    probability: 1,
    bsonType: "Document",
    fields: [{
      name: "city",
      path: ["address", "city"],
      count: 14,
      type: "String",
      probability: 1,
      hasDuplicates: true,
      types: [{
        name: "String",
        path: ["address", "city"],
        count: 14,
        probability: 1,
        unique: 8,
        hasDuplicates: true,
        values: ["Anytown", "Otherville", "Another City", "Smalltown", "Metropolis", "Sunnyville", "Hometown", "Newville", "Anytown", "Otherville", "Another City", "Smalltown", "Metropolis", "Sunnyville"],
        bsonType: "String"
      }]
    }, {
      name: "country",
      path: ["address", "country"],
      count: 14,
      type: "String",
      probability: 1,
      hasDuplicates: true,
      types: [{
        name: "String",
        path: ["address", "country"],
        count: 14,
        probability: 1,
        unique: 1,
        hasDuplicates: true,
        values: ["USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA", "USA"],
        bsonType: "String"
      }]
    }, {
      name: "street",
      path: ["address", "street"],
      count: 14,
      type: ["String", "Document"],
      probability: 1,
      hasDuplicates: false,
      types: [{
        name: "String",
        path: ["address", "street"],
        count: 8,
        probability: 0.5714285714285714,
        unique: 8,
        hasDuplicates: false,
        values: ["123 Main St", "456 Elm St", "789 Oak St", "321 Pine St", "567 Cedar St", "111 Oak Ave", "890 Maple St", "246 Pine St"],
        bsonType: "String"
      }, {
        name: "Document",
        path: ["address", "street"],
        count: 6,
        probability: 0.42857142857142855,
        bsonType: "Document",
        fields: [{
          name: "number",
          path: ["address", "street", "number"],
          count: 6,
          type: "Number",
          probability: 1,
          hasDuplicates: false,
          types: [{
            name: "Number",
            path: ["address", "street", "number"],
            count: 6,
            probability: 1,
            unique: 6,
            hasDuplicates: false,
            values: [123, 456, 789, 321, 567, 111],
            bsonType: "Number"
          }]
        }, {
          name: "street",
          path: ["address", "street", "street"],
          count: 6,
          type: "String",
          probability: 1,
          hasDuplicates: false,
          types: [{
            name: "String",
            path: ["address", "street", "street"],
            count: 6,
            probability: 1,
            unique: 6,
            hasDuplicates: false,
            values: ["Main St", "Elm St", "Oak St", "Pine St", "Cedar St", "Oak Ave"],
            bsonType: "String"
          }]
        }]
      }]
    }, {
      name: "zipcode",
      path: ["address", "zipcode"],
      count: 14,
      type: "String",
      probability: 1,
      hasDuplicates: true,
      types: [{
        name: "String",
        path: ["address", "zipcode"],
        count: 14,
        probability: 1,
        unique: 4,
        hasDuplicates: true,
        values: ["12345", "54321", "67890", "54321", "98765", "54321", "54321", "54321", "12345", "54321", "67890", "54321", "98765", "54321"],
        bsonType: "String"
      }]
    }]
  }]
}
```

## Array Chart

I don't know what will be in the Array. It would be nice if that didn't matter. To archive this, an Array Chart provides only the outer shell and creates charts itself. This way, If we can handle a data construct on the outer layer, we can handle it inside of an array.
