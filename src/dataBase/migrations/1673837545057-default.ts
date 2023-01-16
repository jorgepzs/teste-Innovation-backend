import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673837545057 implements MigrationInterface {
    name = 'default1673837545057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "towns_rj" ("id" uuid NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cdee88eafd891e0dae568ae662b" UNIQUE ("name"), CONSTRAINT "PK_a3e9215878275545fbf029e8490" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "towns_rj"`);
    }

}
