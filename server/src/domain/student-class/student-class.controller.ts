import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { CourseRepository } from '../course/course.repository';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
  StudentClassSummaryDTO,
  UpdateStudentClassDTO,
} from './student-class.dto';
import { StudentClass } from './student-class.entity';
import { StudentClassRepository } from './student-class.repository';

@Controller('/api/studentclasses')
export class StudentClassController {
  constructor(
    private courseRepository: CourseRepository,
    private studentClassRepository: StudentClassRepository,
  ) {}

  @Post()
  async create(
    @Body() student: InsertStudentClassDTO,
  ): Promise<StudentClassDTO> {
    const course = await this.courseRepository.findOne(student.courseId);
    if (!course) {
      throw new NotFoundException('Selected course does not exist', 'courseId');
    }
    const studentClass = StudentClass.create(
      course,
      student.name,
      student.isActive,
    );
    const insertedCourse = await this.studentClassRepository.save(studentClass);
    return new StudentClassDTO(insertedCourse);
  }

  @Get()
  async list(): Promise<StudentClassSummaryDTO[]> {
    return await (
      await this.studentClassRepository.getStudentClassesSumary()
    ).map((studentClass) => new StudentClassSummaryDTO(studentClass));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<StudentClassDTO> {
    const response = await this.studentClassRepository.findOne({ id });
    if (response == null) {
      throw new NotFoundException('A turma não existe', 'id');
    }
    return new StudentClassDTO(response);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() studentClass: UpdateStudentClassDTO,
  ) {
    const original = await this.studentClassRepository.findOne({ id });
    if (original == null) {
      throw new NotFoundException('A turma não existe', 'id');
    }
    original.update(studentClass);
    await this.studentClassRepository.save(original);
  }
}
