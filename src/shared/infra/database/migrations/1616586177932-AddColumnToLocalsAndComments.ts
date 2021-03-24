/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnToLocalsAndComments1616586177932
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'subject',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'locals',
      new TableColumn({
        name: 'count',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('locals', 'count');

    await queryRunner.dropColumn('comments', 'subject');
  }
}
