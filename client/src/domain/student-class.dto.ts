import { CourseDTO } from './course.dto';
import { StudentDTO } from './student.dto';

export class InsertStudentClassDTO {
  name?: string;
  courseId?: string;
  isActive: boolean = true;
  students: string[] = [];
}

export class UpdateStudentClassDTO {
  name?: string;
  isActive: boolean = true;
  students: string[] = [];
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
}
