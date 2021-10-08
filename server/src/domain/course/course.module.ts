import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CoursesService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CourseModule {}
