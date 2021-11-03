import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Course } from '../course/course.entity';
import { StudentDTO } from '../student/student.dto';
import { StudentClass } from './student-class.entity';

export class InsertStudentClassDTO {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da turma' })
  name: string;

  @IsUUID(4, { message: 'O id do curso não é válido' })
  @IsNotEmpty({ message: 'Informe o curso' })
  courseId: string;

  @IsBoolean()
  isActive: boolean;

  students: string[];
}

export class UpdateStudentClassDTO {
  @IsString()
  @IsNotEmpty({ message: 'Informe o nome da turma' })
  name: string;

  @IsBoolean()
  isActive: boolean;

  students: string[];
}

export class StudentClassDTO {
  constructor(studentClass: StudentClass, course: Course) {
    this.id = studentClass.id;
    this.course = {
      id: course.id,
      name: course.name,
    };
    this.name = studentClass.name;
    this.isActive = studentClass.isActive;
    this.students = studentClass.students?.map(
      (student) => new StudentDTO(student),
    );
  }

  id: string;
  course: {
    id: string;
    name: string;
  };
  name: string;
  isActive: boolean;
  students: StudentDTO[];
}

export class StudentClassSummaryDTO {
  id: string;
  course: string;
  name: string;
  isActive: boolean;
  numberOfStudents: number;
}
