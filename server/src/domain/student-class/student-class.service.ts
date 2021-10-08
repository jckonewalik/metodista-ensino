import { Injectable } from '@nestjs/common';
import { CourseRepository } from 'src/domain/course/course.repository';
import { InsertStudentClassDTO, StudentClassDTO } from './student-class.dto';
import { StudentClass } from './student-class.entity';
import { StudentClassRepository } from './student-class.repository';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { NotFoundException } from 'src/exceptions/not-found.exception';

@Injectable()
export class StudentClassesService {
  constructor(
    private courseRepository: CourseRepository,
    private studentClassRepository: StudentClassRepository,
  ) {}

  async createStudentClass(
    studentClassDTO: InsertStudentClassDTO,
  ): Promise<StudentClassDTO> {
    const course = await this.courseRepository.findOne(
      studentClassDTO.courseId,
    );
    if (!course) {
      throw new NotFoundException('Selected course does not exist', 'courseId');
    }
    if (!course.isActive) {
      throw new BadRequestException('Course is not active', 'courseId');
    }
    const studentClass = new StudentClass();
    studentClass.id = uuidv4();
    studentClass.courseId = course.id;
    studentClass.name = studentClassDTO.name;
    studentClass.isActive = studentClassDTO.isActive;
    studentClass.createdBy = '94f4303f-bb36-417f-8269-8c37b041b427';

    const insertedCourse = await this.studentClassRepository.save(studentClass);
    return new StudentClassDTO(insertedCourse);
  }
}
