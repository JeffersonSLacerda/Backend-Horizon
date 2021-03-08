/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RenameTableStausInLocalAndAddLink1614795813264
implements MigrationInterface {
  name = 'RenameTableStausInLocalAndAddLink1614795813264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "locals" DROP COLUMN "staus"');
    await queryRunner.query(
      'ALTER TABLE "locals" ADD "status" character varying NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "locals" ADD "link" character varying NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "locals" DROP COLUMN "link"');
    await queryRunner.query('ALTER TABLE "locals" DROP COLUMN "status"');
    await queryRunner.query(
      'ALTER TABLE "locals" ADD "staus" character varying NOT NULL',
    );
  }
}
