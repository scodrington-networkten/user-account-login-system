/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddWatchLaterMovie1753849825259 {
    name = 'AddWatchLaterMovie1753849825259'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "watch_later_movie" ("id" SERIAL NOT NULL, "movie_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_cb0fb55e142767e6fd90b40d7ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "watch_later_movie" ADD CONSTRAINT "FK_8c383178ccb493f4e0ddfbae71d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "watch_later_movie" DROP CONSTRAINT "FK_8c383178ccb493f4e0ddfbae71d"`);
        await queryRunner.query(`DROP TABLE "watch_later_movie"`);
    }
}
