import { CourseDTO } from './course.dto';

export class InsertStudentClassDTO {
  name?: string;
  courseId?: string;
  isActive: boolean = true;
}

export class UpdateStudentClassDTO {
  name?: string;
  isActive: boolean = true;
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
}
