import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'student_class' })
export class StudentClass {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'course_id' })
  courseId: string;

  @Column()
  name: string;

  @Column({ name: 'active', default: true })
  isActive: boolean;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
