/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1749537159171 {
    name = 'InitSchema1749537159171'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "metadata_id" integer, CONSTRAINT "UQ_d091f1d36f18bbece2a9eabc6e0" UNIQUE ("created_at"), CONSTRAINT "REL_6b8ab049aa434c57d1cdceb218" UNIQUE ("metadata_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_metadata" ("id" SERIAL NOT NULL, "email" text NOT NULL, "bio" text, "avatar_url" character varying, CONSTRAINT "PK_6b8ab049aa434c57d1cdceb2188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6b8ab049aa434c57d1cdceb2188" FOREIGN KEY ("metadata_id") REFERENCES "user_metadata"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6b8ab049aa434c57d1cdceb2188"`);
        await queryRunner.query(`DROP TABLE "user_metadata"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
