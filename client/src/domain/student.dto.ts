import { PersonDTO } from './person.dto';

export class InsertStudentDTO {
  name?: string;
  gender?: string;
}

export class StudentDTO extends PersonDTO {}
