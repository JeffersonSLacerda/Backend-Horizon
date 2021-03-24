/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddIsPrincipalToPictures1615315784633
  implements MigrationInterface {
  name = 'AddIsPrincipalToPictures1615315784633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pictures" ADD COLUMN "isPrincipal" BOOLEAN NOT NULL DEFAULT FALSE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pictures" DROP COLUMN "isPrincipal"');
  }
}
