/* eslint-disable indent */
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeysToComment1614277467385
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('comments', [
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'local_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKeys('comments', [
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'CommentUser',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
      new TableForeignKey({
        columnNames: ['local_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
        name: 'CommentLocal',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'CommentLocal');
    await queryRunner.dropForeignKey('comments', 'CommentUser');
    await queryRunner.dropColumn('comments', 'local_id');
    await queryRunner.dropColumn('comments', 'user_id');
  }
}
