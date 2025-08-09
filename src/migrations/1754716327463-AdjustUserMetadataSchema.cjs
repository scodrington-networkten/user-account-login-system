/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AdjustUserMetadataSchema1754716327463 {
    name = 'AdjustUserMetadataSchema1754716327463'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_metadata" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_metadata" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "user_metadata" ADD "sex" text`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_metadata" DROP COLUMN "sex"`);
        await queryRunner.query(`ALTER TABLE "user_metadata" ADD "avatar_url" character varying`);
        await queryRunner.query(`ALTER TABLE "user_metadata" ADD "email" text NOT NULL`);
    }
}
