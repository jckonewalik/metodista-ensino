import { Controller, Get, Query } from '@nestjs/common';
import { CourseDTO } from './course.dto';
import { CoursesService } from './course.service';

@Controller('/api/courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  @Get()
  async findAll(@Query('active') onlyActives): Promise<CourseDTO[]> {
    return await this.service.getCourses(!!onlyActives);
  }
}
