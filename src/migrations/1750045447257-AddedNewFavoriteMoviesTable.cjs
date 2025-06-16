/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddedNewFavoriteMoviesTable1750045447257 {
    name = 'AddedNewFavoriteMoviesTable1750045447257'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "favorite_movie" ("id" SERIAL NOT NULL, "movie_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_407f83234166eae1334b6f0aa87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_movie" ADD CONSTRAINT "FK_9f2ef442c03881afb5b7a9a1695" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "favorite_movie" DROP CONSTRAINT "FK_9f2ef442c03881afb5b7a9a1695"`);
        await queryRunner.query(`DROP TABLE "favorite_movie"`);
    }
}
