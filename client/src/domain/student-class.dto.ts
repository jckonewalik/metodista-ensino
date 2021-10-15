export class InsertStudentClassDTO {
  constructor(
    public name: string,
    public courseId?: string,
    public isActive?: boolean
  ) {}
}

export class StudentClassSummaryDTO {
  constructor(
    public id: string,
    public course: string,
    public name: string,
    public isActive: boolean,
    public numberOfStudents: number
  ) {}
}

export class StudentClassDTO {
  constructor(
    public id: string,
    public courseId: string,
    public name: string,
    public isActive: boolean
  ) {}
}
