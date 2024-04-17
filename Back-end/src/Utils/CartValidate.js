const Ajv = require("ajv")  // class Ajv
const ajv = new Ajv()       // instance from class Ajv

const CartValidate = {
    "type": "object",
    "properties": {
      "userId": { "type": "string", "format": "objectid" }, // refere to the user id
      "items": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "productId": { "type": "string", "format": "objectid" }, // refere to product id
            "quantity": { "type": "number" }
          },
          "required": ["productId", "quantity"],
          "additionalProperties": false
        }
      }
    },
    "required": ["userId", "items"],
    "additionalProperties": false
  }

  module.exports = ajv.compile(CartValidate)
  