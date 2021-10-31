import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { InsertStudentDTO } from './student.dto';

@Entity({ name: 'student' })
export class Student {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  private constructor() {}

  static create(name: string, gender: string): Student {
    const student = new Student();
    student.id = uuidv4();
    student.name = name;
    student.gender = gender;

    return student;
  }

  update(student: InsertStudentDTO) {
    this.name = student.name;
    this.gender = student.gender;
    this.updatedAt = new Date();
  }
}
