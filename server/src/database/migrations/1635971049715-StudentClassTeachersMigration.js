const { TableForeignKey, Table } = require('typeorm');

module.exports = class StudentClassTeachersMigration1635971049715 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'student_class_teachers',
        columns: [
          {
            name: 'teacher_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'student_class_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'student_class_teachers',
      new TableForeignKey({
        columnNames: ['teacher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teacher',
      }),
    );
    await queryRunner.createForeignKey(
      'student_class_teachers',
      new TableForeignKey({
        columnNames: ['student_class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student_class',
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('student_class_teachers');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('teacher_id') !== -1,
    );
    await queryRunner.dropForeignKey('student_class_teachers', foreignKey);
    await queryRunner.dropTable('student_class_teachers');
  }
};
