/* eslint-disable indent */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeIsAtivoOnUsers1614865113219
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isAtivo');

    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'isAtivo', type: 'boolean', default: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isAtivo');

    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'isAtivo', type: 'boolean' }),
    );
  }
}
