/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationLocalsTags1614788362476
  implements MigrationInterface {
  name = 'RelationLocalsTags1614788362476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "locals_tags_tags" ("localsId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_7bb48d0b9e6bc5c9b4c3c6b2bba" PRIMARY KEY ("localsId", "tagsId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_0793df5a2762dc4f515e2d2ce7" ON "locals_tags_tags" ("localsId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_6b54d31029407b23bf35ce53fd" ON "locals_tags_tags" ("tagsId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_tags_tags" ADD CONSTRAINT "FK_0793df5a2762dc4f515e2d2ce75" FOREIGN KEY ("localsId") REFERENCES "locals"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_tags_tags" ADD CONSTRAINT "FK_6b54d31029407b23bf35ce53fd1" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "locals_tags_tags" DROP CONSTRAINT "FK_6b54d31029407b23bf35ce53fd1"',
    );
    await queryRunner.query(
      'ALTER TABLE "locals_tags_tags" DROP CONSTRAINT "FK_0793df5a2762dc4f515e2d2ce75"',
    );
    await queryRunner.query('DROP INDEX "IDX_6b54d31029407b23bf35ce53fd"');
    await queryRunner.query('DROP INDEX "IDX_0793df5a2762dc4f515e2d2ce7"');
    await queryRunner.query('DROP TABLE "locals_tags_tags"');
  }
}
