/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeColumnNamesInUsers1614107592024
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'first_name', 'firstName');

    await queryRunner.renameColumn('users', 'last_name', 'lastName');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'lastName', 'last_name');

    await queryRunner.renameColumn('users', 'firstName', 'first_name');
  }
}
