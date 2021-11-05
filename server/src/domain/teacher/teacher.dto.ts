import { IsNotEmpty, IsString } from 'class-validator';
import { Teacher } from './teacher.entity';

export class InsertTeacherDTO {
  @IsString({ message: 'O nome do professor é inválido' })
  @IsNotEmpty({ message: 'Informe o nome do professor' })
  name: string;

  @IsString({ message: 'O genero do professor é inválido' })
  gender: string;
}

export class TeacherDTO {
  constructor(teacher: Teacher) {
    this.id = teacher.id;
    this.name = teacher.name;
    this.gender = teacher.gender;
  }

  id: string;
  name: string;
  gender: string;
}
