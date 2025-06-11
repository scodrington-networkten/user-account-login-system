/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddedEmailColumnToUser1749600394919 {
    name = 'AddedEmailColumnToUser1749600394919'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }
}
