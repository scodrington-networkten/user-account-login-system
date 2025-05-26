import {EntitySchema} from "typeorm";
import "reflect-metadata";

const entitySchema = new EntitySchema({
    name: "movie",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: true
        },
        title: {
            type: String,
        },
        portrait_image: {
            type: String,
            nullable: true,
        },
        landscape_image: {
            type: String,
            nullable: true,
        },
        genre_ids: {
            type: "simple-array",
            nullable: true,
        },
        is_adult: {
            type: Boolean,
        },
        language: {
            type: String,
        },
        overview: {
            type: "text",
        },
        popularity: {
            type: "float",
        },
        release_date: {
            type: String,
        },
        is_video: {
            type: Boolean,
        },
        vote_score: {
            type: "float",
        },
        vote_count: {
            type: Number,
        },
        uid: {
            type: Number
        }
    }
})
export default entitySchema;
