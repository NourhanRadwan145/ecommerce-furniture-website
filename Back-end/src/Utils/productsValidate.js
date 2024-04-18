const Ajv = require("ajv");
const ajv = new Ajv(); 

const productsSchema = {
    type: "object",
    properties: {
        title: { type: "string" , maxLength: 50},
        image: { type: "string" },
        price: { type: "number", minimum: 50, maximum: 1000},
        details: { type: "string" , maxLength: 100}
    },
    required: ["title", "image", "price", "details"],
    additionalProperties: false,
};

const validate = ajv.compile(productsSchema);
module.exports = validate;
