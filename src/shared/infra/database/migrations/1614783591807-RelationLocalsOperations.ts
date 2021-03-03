/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationLocalsOperations1614783591807
  implements MigrationInterface {
  name = 'RelationLocalsOperations1614783591807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "operations" ADD "localId" uuid');
    await queryRunner.query(
      'ALTER TABLE "operations" ADD CONSTRAINT "FK_09776818f5b5bccc6c0859cd94e" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "operations" DROP CONSTRAINT "FK_09776818f5b5bccc6c0859cd94e"',
    );
    await queryRunner.query('ALTER TABLE "operations" DROP COLUMN "localId"');
  }
}
