/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationLocalsUsers1614780019551
  implements MigrationInterface {
  name = 'RelationLocalsUsers1614780019551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "locals" ADD "userId" uuid');
    await queryRunner.query(
      'ALTER TABLE "locals" ADD CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "locals" DROP CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452"',
    );

    await queryRunner.query('ALTER TABLE "locals" DROP COLUMN "userId"');
  }
}
