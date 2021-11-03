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
    await queryRunner.dropTable('student');
  }
};
