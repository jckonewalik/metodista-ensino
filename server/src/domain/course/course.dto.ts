import { Course } from './course.entity';

export class CourseDTO {
  constructor(course: Course) {
    this.id = course.id;
    this.name = course.name;
    this.isActive = course.isActive;
  }

  id: string;
  name: string;
  isActive: boolean;
}
