import { BadRequestException } from '../../exceptions/bad-request.exception';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../course/course.entity';
import { UpdateStudentClassDTO } from './student-class.dto';
@Entity({ name: 'student_class' })
export class StudentClass {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column()
  name: string;

  @Column({ name: 'active', default: true })
  isActive: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  course: Course;

  private constructor() {}

  static create(course: Course, name, isActive): StudentClass {
    if (!course.isActive) {
      throw new BadRequestException('Course is not active', 'courseId');
    }

    const studentClass = new StudentClass();
    studentClass.id = uuidv4();
    studentClass.courseId = course.id;
    studentClass.name = name;
    studentClass.isActive = isActive;

    return studentClass;
  }

  update(studentClass: UpdateStudentClassDTO) {
    this.name = studentClass.name;
    this.isActive = studentClass.isActive;
    this.updatedAt = new Date();
  }
}
