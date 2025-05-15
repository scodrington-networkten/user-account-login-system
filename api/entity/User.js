const {EntitySchema} = require("typeorm");
import {EntitySchema}  from "typeorm";

module.exports = new EntitySchema({
    name: "User",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
            length: 100,
        },
        email: {
            type: String,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
})
