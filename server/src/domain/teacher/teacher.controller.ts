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
import { TeacherRepository } from './teacher.repository';
import { InsertTeacherDTO, TeacherDTO } from './teacher.dto';
import { Teacher } from './teacher.entity';

@Controller('/api/teachers')
export class TeacherController {
  constructor(private teacherRepository: TeacherRepository) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TeacherDTO> {
    const teacher = await this.teacherRepository.findOne({ id });
    if (teacher == null) {
      throw new NotFoundException('O professor não existe', 'id');
    }
    return new TeacherDTO(teacher);
  }

  @Get()
  async findAll(
    @Query('name') name = '',
    @Query('take') take = 100,
    @Query('page') page = 1,
  ) {
    return await this.teacherRepository.getTeachers({ name, take, page });
  }

  @Post()
  async create(@Body() teacherDTO: InsertTeacherDTO): Promise<TeacherDTO> {
    const teacher = Teacher.create(teacherDTO.name, teacherDTO.gender);
    const insertedTeacher = await this.teacherRepository.save(teacher);
    return new TeacherDTO(insertedTeacher);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() teacher: InsertTeacherDTO,
  ) {
    const original = await this.teacherRepository.findOne({ id });
    if (original == null) {
      throw new NotFoundException('O professor não existe', 'id');
    }
    original.update(teacher);
    await this.teacherRepository.save(original);
  }
}
