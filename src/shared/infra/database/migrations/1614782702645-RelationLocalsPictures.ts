/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationLocalsPictures1614782702645
  implements MigrationInterface {
  name = 'RelationLocalsPictures1614782702645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pictures" ADD "localId" uuid');
    await queryRunner.query(
      'ALTER TABLE "pictures" ADD CONSTRAINT "FK_60ae6a36f9b55b53c8bf8862329" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pictures" DROP CONSTRAINT "FK_60ae6a36f9b55b53c8bf8862329"',
    );
    await queryRunner.query('ALTER TABLE "pictures" DROP COLUMN "localId"');
  }
}
