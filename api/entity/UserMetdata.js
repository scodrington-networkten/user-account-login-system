import {EntitySchema}  from "typeorm";

const entitySchema = new EntitySchema({
    name: "user_metadata",
    tableName: "user_metadata",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "text",
            nullable: false
        },
        bio: {
            type: "text",
            nullable: true
        },
        avatar_url: {
            name: "avatar_url",
            type: "varchar",
            nullable: true
        }
    },
    relations: {
        user: {
            type: "one-to-one",
            target: "user",
            inverseSide: "metadata",
            cascade: ["insert", "update"]
        }
    }
})

export default entitySchema;
