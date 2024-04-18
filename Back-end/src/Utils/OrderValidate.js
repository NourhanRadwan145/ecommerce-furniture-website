const Ajv = require("ajv");
const ajv = new Ajv();

const ordersSchema = {
    type: "object",
    properties: {
        userId: { type: "string" },
        username: { type: "string" },
        date: { type: "string", format: "date-time" },
        totalPrice: { type: "number" },
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    productId: { type: "string" },
                    title: { type: "string" },
                    quantity: { type: "number" }
                },
                required: ["productId", "title", "quantity"],
                additionalProperties: false
            }
        },
        status: { type: "string", enum: ["Pending", "Accepted", "Rejected"] }
    },
    required: ["userId", "username", "date", "totalPrice", "products", "status"],
    additionalProperties: false
};


//#region formats for objectId and dateime
ajv.addFormat("objectId", /^[0-9a-fA-F]{24}$/);
ajv.addFormat("date-time", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/);
//#endregion


const validate = ajv.compile(ordersSchema);
module.exports = validate;
