const Ajv = require("ajv")  // class Ajv
const ajv = new Ajv()       // instance from class Ajv

const UserValidate = {
    "type": "object",
    "properties": {
      "email": { "type": "string", "format": "email" },
      "username": { "type": "string" },
      "password": { "type": "string" },
      "image": { "type": "string", "format": "uri" },
      "gender": { "type": "string" },
      "orders": {
        "type": "array",
        "items": { "type": "string" } // each item is an id of the order
      },
      "isAdmin": { "type": "boolean" } 
    },
    "required": ["email", "username", "password", "image", "gender", "orders", "isAdmin"],
    "additionalProperties": false
  }

  module.exports = ajv.compile(UserValidate)
  

