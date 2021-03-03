/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationUsersCommnets1614781837080
  implements MigrationInterface {
  name = 'RelationUsersCommnets1614781837080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "comments" ADD "userId" uuid');
    await queryRunner.query(
      'ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"',
    );
    await queryRunner.query('ALTER TABLE "comments" DROP COLUMN "userId"');
  }
}
