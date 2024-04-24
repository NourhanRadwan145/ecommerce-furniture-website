const Ajv = require("ajv");
const ajv = new Ajv(); 

const productsSchema = {
    type: "object",
    properties: {
        title: { type: "string", maxLength: 50 },
        image: { type: "string" },
        price: { type: "number", minimum: 50, maximum: 1000 },
        details: { type: "string", maxLength: 100 },
        quantity: { type: "integer", minimum: 0 },
        category: { type: "string" },
        reviews: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    comment: { type: "string" },
                    rating: { type: "integer", minimum: 1, maximum: 5 },
                    date: { type: "string" }
                },
                required: ["name", "comment", "rating", "date"],
                additionalProperties: false
            }
        }
    },
    required: ["title", "image", "price", "details", "quantity", "category", "reviews"],
    additionalProperties: false
};


const validate = ajv.compile(productsSchema);
module.exports = validate;
