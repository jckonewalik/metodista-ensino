const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class CourseMigration1633030788801 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'course',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'bool',
            default: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'updated_by',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(`INSERT INTO course (id, name, active, created_by, created_at)
        VALUES ('7d986d06-2cdc-4d3b-813d-f4d19374f092', 'Fundamentos da Fé', true, 'ad4511eb-292e-4abd-b8b1-6b6fc612a122', NOW()),
        ('079f7caa-f795-4e48-93ec-c5603455f7f7', 'CDV', true, 'ad4511eb-292e-4abd-b8b1-6b6fc612a122', NOW())
    `);
  }

  async down(queryRunner) {
    queryRunner.dropTable('course');
  }
};
