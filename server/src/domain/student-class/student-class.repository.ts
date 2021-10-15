import { EntityRepository, Repository } from 'typeorm';
import { StudentClass } from './student-class.entity';

@EntityRepository(StudentClass)
export class StudentClassRepository extends Repository<StudentClass> {
  async getStudentClassesSumary() {
    return await this.createQueryBuilder('student_class')
      .leftJoinAndMapOne(
        'student_class.course',
        'course',
        'course',
        'course.id = student_class.course_id',
      )
      .getMany();
  }
}
