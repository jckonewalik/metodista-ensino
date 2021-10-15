const { Table, TableForeignKey } = require('typeorm');

module.exports = class StudentClassMigration1633180571313 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'student_class',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'course_id',
            type: 'uuid',
            isNullable: false,
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
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
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
    await queryRunner.createForeignKey(
      'student_class',
      new TableForeignKey({
        columnNames: ['course_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course',
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('student_class');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('question_id') !== -1,
    );
    await queryRunner.dropForeignKey('student_class', foreignKey);
    await queryRunner.dropTable('student_class');
  }
};
