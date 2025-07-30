import {EntitySchema} from "typeorm";

const WatchLaterMovieShema = new EntitySchema({

    name: "watch_later_movie",
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
export default WatchLaterMovieShema;
