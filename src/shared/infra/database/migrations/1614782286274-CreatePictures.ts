import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatePictures1614782286274 implements MigrationInterface {
  name = 'CreatePictures1614782286274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "pictures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7aa5e10dd31983e9f05b9f1fc85" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "pictures"');
  }
}
