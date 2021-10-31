import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { StudentRepository } from './student.repository';
import { InsertStudentDTO, StudentDTO } from './student.dto';
import { Student } from './student.entity';

@Controller('/api/students')
export class StudentController {
  constructor(private studentRepository: StudentRepository) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StudentDTO> {
    const student = await this.studentRepository.findOne({ id });
    if (student == null) {
      throw new NotFoundException('O aluno não existe', 'id');
    }
    return new StudentDTO(student);
  }

  @Get()
  async findAll(
    @Query('name') name = '',
    @Query('take') take = 100,
    @Query('page') page = 1,
  ) {
    return await this.studentRepository.getStudents({ name, take, page });
  }

  @Post()
  async create(@Body() studentDTO: InsertStudentDTO): Promise<StudentDTO> {
    const student = Student.create(studentDTO.name, studentDTO.gender);
    const insertedStudent = await this.studentRepository.save(student);
    return new StudentDTO(insertedStudent);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() student: InsertStudentDTO,
  ) {
    const original = await this.studentRepository.findOne({ id });
    if (original == null) {
      throw new NotFoundException('O aluno não existe', 'id');
    }
    original.update(student);
    await this.studentRepository.save(original);
  }
}
