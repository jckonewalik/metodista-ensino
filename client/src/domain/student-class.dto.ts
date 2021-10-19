import { CourseDTO } from './course.dto';

export class InsertStudentClassDTO {
  name?: string;
  courseId?: string;
  isActive: boolean = true;
}

export class StudentClassSummaryDTO {
  constructor(
    public id: string,
    public course: string,
    public name: string,
    public isActive: boolean,
    public numberOfStudents: number
  ) {}
}

export class StudentClassDTO {
  id?: string;
  course?: CourseDTO | null = null;
  name?: string = '';
  isActive: boolean = true;
}
