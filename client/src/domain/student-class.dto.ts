import { CourseDTO } from './course.dto';
import { StudentDTO } from './student.dto';
import { TeacherDTO } from './teacher.dto';

export class InsertStudentClassDTO {
  name?: string;
  courseId?: string;
  isActive: boolean = true;
  students: string[] = [];
  teachers: string[] = [];
}

export class UpdateStudentClassDTO {
  name?: string;
  isActive: boolean = true;
  students: string[] = [];
  teachers: string[] = [];
}

export class StudentClassSummaryDTO {
  id?: string;
  course?: string;
  name?: string;
  isActive?: boolean;
  numberOfStudents: number = 0;
}

export class StudentClassDTO {
  id?: string;
  course?: CourseDTO | null = null;
  name?: string = '';
  isActive: boolean = true;
  students: StudentDTO[] = [];
  teachers: TeacherDTO[] = [];
}
