import { Injectable } from '@nestjs/common';
import { CourseDTO } from './course.dto';
import { CourseRepository } from './course.repository';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CourseRepository) {}

  async getCourses(onlyActives: boolean = false): Promise<CourseDTO[]> {
    const courses = onlyActives
      ? await this.coursesRepository.findActives()
      : await this.coursesRepository.find();

    return courses.map((course) => new CourseDTO(course));
  }
}
