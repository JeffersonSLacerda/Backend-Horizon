/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeCosntraints1614782120193
implements MigrationInterface {
  name = 'ChangeCosntraints1614782120193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"',
    );
    await queryRunner.query(
      'ALTER TABLE "locals" DROP CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452"',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "locals" ADD CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "locals" DROP CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452"',
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"',
    );
    await queryRunner.query(
      'ALTER TABLE "locals" ADD CONSTRAINT "FK_0a7aedf7f1f19c08710cd016452" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
