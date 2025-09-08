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
    }


});
export default entitySchema;
