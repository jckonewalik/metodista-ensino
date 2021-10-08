import { EntityRepository, Repository } from 'typeorm';
import { StudentClass } from './student-class.entity';

@EntityRepository(StudentClass)
export class StudentClassRepository extends Repository<StudentClass> {}
