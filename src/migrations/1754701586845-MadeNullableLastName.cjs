/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class MadeNullableLastName1754701586845 {
    name = 'MadeNullableLastName1754701586845'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`);
    }
}
