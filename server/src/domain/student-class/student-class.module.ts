import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRepository } from 'src/domain/course/course.repository';
import { StudentClassController } from './student-class.controller';
import { StudentClassRepository } from './student-class.repository';
import { StudentClassesService } from './student-class.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseRepository, StudentClassRepository]),
  ],
  providers: [StudentClassesService],
  controllers: [StudentClassController],
})
export class StudentClassModule {}
