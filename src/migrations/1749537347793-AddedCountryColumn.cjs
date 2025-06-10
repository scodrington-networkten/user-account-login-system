/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddedCountryColumn1749537347793 {
    name = 'AddedCountryColumn1749537347793'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_metadata" ADD "country" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_metadata" DROP COLUMN "country"`);
    }
}
