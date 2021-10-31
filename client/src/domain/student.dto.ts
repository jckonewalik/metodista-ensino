export class InsertStudentDTO {
  name?: string;
  gender?: string;
}

export class StudentDTO {
  id?: string;
  name?: string = '';
  gender?: string = 'M';
}
