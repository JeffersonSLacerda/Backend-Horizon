import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateLocals1614778841733 implements MigrationInterface {
  name = 'CreateLocals1614778841733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "locals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying NOT NULL, "state" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "cep" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "district" character varying NOT NULL, "rating" numeric NOT NULL, "rootOrNutella" boolean NOT NULL, "showName" boolean NOT NULL, "staus" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_56d0b7be926a53ceddcfe4abb1a" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "locals"');
  }
}
