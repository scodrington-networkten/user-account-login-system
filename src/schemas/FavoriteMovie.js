import {EntitySchema} from "typeorm";

/**
 * Holds information about a favorited movie + who favorited it
 * @type {EntitySchema<any>}
 */
const FavoriteMovieSchema = new EntitySchema({
    name: "favorite_movie",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        movie_id: {
            type: Number,
            nullable: false
        },
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

export default FavoriteMovieSchema;
