import { BadRequestException } from '../../exceptions/bad-request.exception';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../course/course.entity';
import { UpdateStudentClassDTO } from './student-class.dto';
import { Student } from '../student/student.entity';
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

  @ManyToMany(() => Student)
  @JoinTable({
    name: 'student_class_students',
    joinColumn: {
      name: 'student_class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: Student[];

  private constructor() {}

  static create(
    course: Course,
    name,
    isActive,
    students: Student[],
  ): StudentClass {
    if (!course.isActive) {
      throw new BadRequestException('Course is not active', 'courseId');
    }

    const studentClass = new StudentClass();
    studentClass.id = uuidv4();
    studentClass.courseId = course.id;
    studentClass.name = name;
    studentClass.isActive = isActive;
    studentClass.students = students;

    return studentClass;
  }

  update(studentClass: UpdateStudentClassDTO, students: Student[]) {
    this.name = studentClass.name;
    this.isActive = studentClass.isActive;
    this.students = students;
    this.updatedAt = new Date();
  }
}
