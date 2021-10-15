import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { StudentClass } from './student-class.entity';

export class InsertStudentClassDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsBoolean()
  isActive: boolean;
}

export class StudentClassDTO {
  constructor(studentClass: StudentClass) {
    this.id = studentClass.id;
    this.courseId = studentClass.courseId;
    this.name = studentClass.name;
    this.isActive = studentClass.isActive;
  }

  id: string;
  courseId: string;
  name: string;
  isActive: boolean;
}

export class StudentClassSummaryDTO {
  constructor(studentClass: StudentClass) {
    this.id = studentClass.id;
    this.course = studentClass.course?.name;
    this.name = studentClass.name;
    this.isActive = studentClass.isActive;
  }

  id: string;
  course: string;
  name: string;
  isActive: boolean;
  numberOfStudents: number;
}
