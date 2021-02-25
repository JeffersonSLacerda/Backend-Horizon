/* eslint-disable indent */
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddForeignKeyToPicture1614278576724
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pictures',
      new TableColumn({
        name: 'local_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'pictures',
      new TableForeignKey({
        columnNames: ['local_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locals',
        name: 'PictureLocals',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pictures', 'PictureLocals');
    await queryRunner.dropColumn('pictures', 'local_id');
  }
}
