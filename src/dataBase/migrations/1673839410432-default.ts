import { MigrationInterface, QueryRunner } from "typeorm";

export class default1673839410432 implements MigrationInterface {
    name = 'default1673839410432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "towns_rj" DROP CONSTRAINT "PK_a3e9215878275545fbf029e8490"`);
        await queryRunner.query(`ALTER TABLE "towns_rj" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "towns_rj" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "towns_rj" ADD CONSTRAINT "PK_a3e9215878275545fbf029e8490" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "towns_rj" DROP CONSTRAINT "PK_a3e9215878275545fbf029e8490"`);
        await queryRunner.query(`ALTER TABLE "towns_rj" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "towns_rj" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "towns_rj" ADD CONSTRAINT "PK_a3e9215878275545fbf029e8490" PRIMARY KEY ("id")`);
    }

}
