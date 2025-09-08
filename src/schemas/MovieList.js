import {EntitySchema} from "typeorm";

const entitySchema = new EntitySchema({

    name: "movie_list",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: true
        },
        movie_ids: {
            type: "simple-array",
            nullable: true,
        },
        title: {
            type: String,
        },
        description: {
            type: "text",
            nullable: true,
        }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "user",
            joinColumn: {
                name: "user_id",
                referencedColumnName: "id"
            },
            nullable: false,
            onDelete: "CASCADE"
        }
    }


});
export default entitySchema;
