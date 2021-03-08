/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeColumnsInLocals1614955820404
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('locals', 'description');
    await queryRunner.dropColumn('locals', 'rating');

    await queryRunner.addColumn(
      'locals',
      new TableColumn({ name: 'description', type: 'text', isNullable: true }),
    );

    await queryRunner.addColumn(
      'locals',
      new TableColumn({
        name: 'rating',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('locals', 'rating');
    await queryRunner.dropColumn('locals', 'description');
    await queryRunner.addColumn(
      'locals',
      new TableColumn({
        name: 'rating',
        type: 'numeric',
      }),
    );
    await queryRunner.addColumn(
      'locals',
      new TableColumn({ name: 'description', type: 'text' }),
    );
  }
}
