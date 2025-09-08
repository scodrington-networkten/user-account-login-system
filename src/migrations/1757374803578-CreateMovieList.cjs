/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateMovieList1757374803578 {
    name = 'CreateMovieList1757374803578'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "movie_list" ("id" SERIAL NOT NULL, "movie_ids" text, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_ffebcf0731c7a1e1d974b7230ab" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "movie_list"`);
    }
}
