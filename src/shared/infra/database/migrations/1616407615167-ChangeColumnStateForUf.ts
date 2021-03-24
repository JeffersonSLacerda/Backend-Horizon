/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeColumnStateForUf1616407615167
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'state');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'uf',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'uf');

    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'state',
        type: 'varchar',
      }),
    );
  }
}
