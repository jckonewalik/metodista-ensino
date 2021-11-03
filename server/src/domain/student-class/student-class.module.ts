import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from 'src/domain/course/course.repository';
import { StudentRepository } from '../student/student.repository';
import { StudentClassController } from './student-class.controller';
import { StudentClassRepository } from './student-class.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseRepository,
      StudentClassRepository,
      StudentRepository,
    ]),
  ],
  providers: [],
  controllers: [StudentClassController],
})
export class StudentClassModule {}
