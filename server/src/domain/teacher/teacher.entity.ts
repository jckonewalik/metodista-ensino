import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { InsertTeacherDTO } from './teacher.dto';

@Entity({ name: 'teacher' })
export class Teacher {
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

  static create(name: string, gender: string): Teacher {
    const teacher = new Teacher();
    teacher.id = uuidv4();
    teacher.name = name;
    teacher.gender = gender;

    return teacher;
  }

  update(teacher: InsertTeacherDTO) {
    this.name = teacher.name;
    this.gender = teacher.gender;
    this.updatedAt = new Date();
  }
}
