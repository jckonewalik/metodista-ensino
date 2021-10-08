import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { InsertStudentClassDTO } from './student-class.dto';
import { StudentClassesService } from './student-class.service';

@Controller('/api/studentclasses')
export class StudentClassController {
  constructor(private studentClassService: StudentClassesService) {}

  @Post()
  createStudentClass(@Body() student: InsertStudentClassDTO) {
    return this.studentClassService.createStudentClass(student);
  }
}
