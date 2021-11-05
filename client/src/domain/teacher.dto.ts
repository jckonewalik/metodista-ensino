import { PersonDTO } from './person.dto';

export class InsertTeacherDTO {
  name?: string;
  gender?: string;
}

export class TeacherDTO extends PersonDTO {}
