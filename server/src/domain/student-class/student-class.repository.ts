import { EntityRepository, Repository } from 'typeorm';
import { StudentClass } from './student-class.entity';

@EntityRepository(StudentClass)
export class StudentClassRepository extends Repository<StudentClass> {
  async getStudentClassesSumary() {
    return await this.createQueryBuilder('student_class')
      .leftJoin('course', 'course', 'course.id = student_class.course_id')
      .select('student_class.id', 'id')
      .addSelect('student_class.name', 'name')
      .addSelect('course.name', 'course')
      .addSelect('student_class.active', 'isActive')
      .getRawMany();
  }
}
