const { Table, TableForeignKey } = require('typeorm');

module.exports = class StudentClassStudentsMigration1635765117188 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'student_class_students',
        columns: [
          {
            name: 'student_id',
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
      'student_class_students',
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student',
      }),
    );
    await queryRunner.createForeignKey(
      'student_class_students',
      new TableForeignKey({
        columnNames: ['student_class_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student_class',
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('student_class_students');
    const foreignKeyStudent = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('student_id') !== -1,
    );
    await queryRunner.dropForeignKey('student_class', foreignKeyStudent);
    const foreignKeyClass = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('student_class_id') !== -1,
    );
    await queryRunner.dropForeignKey('student_class', foreignKeyClass);
    await queryRunner.dropTable('student_class_students');
  }
};
