
# TypeORM Documentation

This project used TypeORM to define the object schema for the following entites
- User
- UserMetadata
- WatchLaterMovie
- FavorirteMovie

This creates the column structure and defines the relationships.


## Data-source.js

This is the main configuration point where we create the Datasource and load up the entities that will be used

~~~
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: +(process.env.PGPORT || 5432),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: false,
    logging: isProd,
    entities: [UserSchema, UserMetdata, FavoriteMovieSchema, WatchLaterMovieShema],
    migrations: ["src/migrations/*.cjs"],  
});
~~~

## Entities

These entities represent a single table in the DB. These entities are written in JS (the automatic creation of these use TS, not JS, so these files were manually created).
TypeOrm can interact with JS/TS files, but it generates TS entities only.

~~~
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
            nullable: true
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
        },
        watch_later_movies: {
            type: "one-to-many",
            target: "watch_later_movie",
            inverseSide: "user",
            cascade: true
        }
    }
})
export default UserSchema;
~~~

The above defines a User object and its associated fields.

## 1- Creating Migrations

When we update the structure of any entity (e.g User.js) we need to create a **migration** which defines how the structure has been changed.

~~~
typeorm migration:generate ./src/migrations/MadeNullableLastName -d ./src/data-source.js -o
~~~

- /src/migrations/{name} 
  - Creates a migration in the /src/migration directory called XYZ, give it a good name
- -d ./src/data-source.js
  - Points to the location of the datasource file (so it can find all the entities and connection)
- -o 
  - Output the file in Js, if ommited will create in TS which won't work well


## 2- Renaming the Migration

When the migration is created it becomes a `.js` file, for some reason we need to rename it to `.cjs` else the migration ends up breaking. I have no idea why, just do it. 


## 3 - Running Migrations

Each migration has to run with the following

~~~
typeorm migration:run -d ./src/data-source.js

~~~

This will run the migration, mark it as done in the DB and the schema changes will take effect


