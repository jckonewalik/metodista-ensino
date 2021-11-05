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
import { Student } from '../student/student.entity';
import { StudentRepository } from '../student/student.repository';
import { Teacher } from '../teacher/teacher.entity';
import { TeacherRepository } from '../teacher/teacher.repository';
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
    private studentRepository: StudentRepository,
    private studentClassRepository: StudentClassRepository,
    private teacherRepository: TeacherRepository,
  ) {}

  @Post()
  async create(
    @Body() studentClassDTO: InsertStudentClassDTO,
  ): Promise<StudentClassDTO> {
    const course = await this.courseRepository.findOne(
      studentClassDTO.courseId,
    );
    if (!course) {
      throw new NotFoundException('Selected course does not exist', 'courseId');
    }
    const students = await this.findStudents(studentClassDTO.students);
    const teachers = await this.findTeachers(studentClassDTO.teachers);
    const studentClass = StudentClass.create(
      course,
      studentClassDTO.name,
      studentClassDTO.isActive,
      students,
      teachers,
    );
    const insertedCourse = await this.studentClassRepository.save(studentClass);
    return new StudentClassDTO(insertedCourse, course);
  }

  @Get()
  async list(): Promise<StudentClassSummaryDTO[]> {
    return await this.studentClassRepository.getStudentClassesSumary();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<StudentClassDTO> {
    const studentClass = await this.studentClassRepository.findOne(id, {
      relations: ['students', 'teachers'],
    });
    if (studentClass == null) {
      throw new NotFoundException('A turma não existe', 'id');
    }
    const course = await this.courseRepository.findOne({
      id: studentClass.courseId,
    });
    return new StudentClassDTO(studentClass, course);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() studentClass: UpdateStudentClassDTO,
  ) {
    const original = await this.studentClassRepository.findOne(id, {
      relations: ['students'],
    });
    if (original == null) {
      throw new NotFoundException('A turma não existe', 'id');
    }
    const students = await this.findStudents(studentClass.students);
    const teachers = await this.findTeachers(studentClass.teachers);

    original.update(studentClass, students, teachers);
    await this.studentClassRepository.save(original);
  }

  private async findStudents(ids: string[]): Promise<Student[]> {
    try {
      const students = await this.studentRepository.findByIds(ids);
      if (students.length != ids.length) {
        throw new NotFoundException(
          'Os alunos informados não foram encontrados',
          'student.id',
        );
      }
      return students;
    } catch (err) {
      throw new NotFoundException(
        'Os alunos informados não foram encontrados',
        'student.id',
      );
    }
  }

  private async findTeachers(ids: string[]): Promise<Teacher[]> {
    try {
      const teachers = await this.teacherRepository.findByIds(ids);
      if (teachers.length != ids.length) {
        throw new NotFoundException(
          'Os professores informados não foram encontrados',
          'teacher.id',
        );
      }
      return teachers;
    } catch (err) {
      throw new NotFoundException(
        'Os professores informados não foram encontrados',
        'teacher.id',
      );
    }
  }
}
