import { EntityRepository, Repository } from 'typeorm';
import { Course } from './course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  findActives() {
    return this.find({ isActive: true });
  }
}
