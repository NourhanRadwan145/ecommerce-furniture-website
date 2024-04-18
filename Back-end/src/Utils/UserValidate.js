const Ajv = require("ajv")
const ajv = new Ajv()

const UserValidate = {
    "type": "object",
    "properties": {
      "email": { "type": "string" },
      "username": { "type": "string" },
      "password": { "type": "string" },
      "image": { "type": "string" },
      "gender": { "type": "string" },
      "orders": {
        "type": "array",
        "items": { "type": "string" }
      },
      "carts": {
        "type": "array",
        "items": { "type": "string" }
      },
      "isAdmin": { "type": "boolean" } 
    },
    "required": ["email", "username", "password", "image", "gender", "orders", "carts", "isAdmin"],
    "additionalProperties": false
};

module.exports = ajv.compile(UserValidate);
  

