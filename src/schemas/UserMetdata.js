import {EntitySchema} from "typeorm";

const UserMetadataSchema = new EntitySchema({
    name: "user_metadata",
    tableName: "user_metadata",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        bio: {
            type: "text",
            nullable: true
        },
        country: {
            type: "varchar",
            nullable: true
        },
        sex: {
            type: "text",
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

export default UserMetadataSchema;
