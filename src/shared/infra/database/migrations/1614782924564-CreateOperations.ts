/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateOperations1614782924564
  implements MigrationInterface {
  name = 'CreateOperations1614782924564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "operations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day" character varying NOT NULL, "openTime" TIME NOT NULL, "closeTime" TIME NOT NULL, "price" money NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b62d84d6f9912b975987165856" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "operations"');
  }
}
