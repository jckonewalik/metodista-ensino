import { IsNotEmpty, IsString } from 'class-validator';
import { Student } from './student.entity';

export class InsertStudentDTO {
  @IsString({ message: 'O nome do aluno é inválido' })
  @IsNotEmpty({ message: 'Informe o nome do aluno' })
  name: string;

  @IsString({ message: 'O genero do aluno é inválido' })
  gender: string;
}

export class StudentDTO {
  constructor(student: Student) {
    this.id = student.id;
    this.name = student.name;
    this.gender = student.gender;
  }

  id: string;
  name: string;
  gender: string;
}
