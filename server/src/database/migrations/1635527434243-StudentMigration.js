const { Table } = require('typeorm');

module.exports = class StudentMigration1635527434243 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'student',
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
            name: 'gender',
            type: 'varchar',
            isNullable: false,
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
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('student_class_students');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('student_id') !== -1,
    );
    await queryRunner.dropForeignKey('student_class_students', foreignKey);
    await queryRunner.dropTable('student');
  }
};
