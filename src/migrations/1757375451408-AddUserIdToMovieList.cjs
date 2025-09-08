/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddUserIdToMovieList1757375451408 {
    name = 'AddUserIdToMovieList1757375451408'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie_list" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_list" ADD CONSTRAINT "FK_bf80c236e35432db0885c89c523" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie_list" DROP CONSTRAINT "FK_bf80c236e35432db0885c89c523"`);
        await queryRunner.query(`ALTER TABLE "movie_list" DROP COLUMN "user_id"`);
    }
}
