import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateLocal1614185142594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'openTime',
            type: 'time without time zone',
          },
          {
            name: 'closeTime',
            type: 'time without time zone',
          },
          {
            name: 'openDays',
            type: 'enum',
            enum: ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'],
            enumName: 'daysOfTheWeek',
          },
          {
            name: 'price',
            type: 'money',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'rating',
            type: 'decimal',
            precision: 1,
            default: 5,
          },
          {
            name: 'link',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rootOrNutella',
            type: 'boolean',
          },
          {
            name: 'showName',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timeStamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timeStamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('locals');
  }
}
