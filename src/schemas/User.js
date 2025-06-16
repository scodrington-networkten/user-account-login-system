import {EntitySchema} from "typeorm";

const UserSchema = new EntitySchema({
    name: "user",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        first_name: {
            type: String,
            length: 100,
            nullable: false
        },
        last_name: {
            type: String,
            length: 100,
            nullable: false
        },
        created_at: {
            type: 'timestamptz',
            unique: true,
            nullable: false
        },
        is_active: {
            type: Boolean,
            default: true,
            nullable: false
        },
        email: {
            type: String,
            length: 100,
            nullable: false
        },
        password: {
            type: "varchar",
            nullable: false,
        }
    },
    relations: {
        metadata: {
            type: "one-to-one",
            target: "user_metadata",
            inverseSide: "user",
            cascade: ["insert", "update"],
            joinColumn: {
                name: "metadata_id",
                referencedColumnName: "id"
            },
        },
        favorite_movies: {
            type: "one-to-many",
            target: "favorite_movie",
            inverseSide: "user",
            cascade: true
        }
    }
})
export default UserSchema;
