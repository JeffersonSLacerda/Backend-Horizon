/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationLocalsComments1614788234627
implements MigrationInterface {
  name = 'RelationLocalsComments1614788234627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "locals_comments_comments" ("localsId" uuid NOT NULL, "commentsId" uuid NOT NULL, CONSTRAINT "PK_ee84a1bed2c1b049f3d7dcfc5d1" PRIMARY KEY ("localsId", "commentsId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_641cd7000dfc0d31c1412aee74" ON "locals_comments_comments" ("localsId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_784a7ba5360223a6c3fee534a3" ON "locals_comments_comments" ("commentsId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_comments_comments" ADD CONSTRAINT "FK_641cd7000dfc0d31c1412aee74c" FOREIGN KEY ("localsId") REFERENCES "locals"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_comments_comments" ADD CONSTRAINT "FK_784a7ba5360223a6c3fee534a3a" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "locals_comments_comments" DROP CONSTRAINT "FK_784a7ba5360223a6c3fee534a3a"',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_comments_comments" DROP CONSTRAINT "FK_641cd7000dfc0d31c1412aee74c"',
    );
    await queryRunner.query('DROP INDEX "IDX_784a7ba5360223a6c3fee534a3"');
    await queryRunner.query('DROP INDEX "IDX_641cd7000dfc0d31c1412aee74"');
    await queryRunner.query('DROP TABLE "locals_comments_comments"');
  }
}
