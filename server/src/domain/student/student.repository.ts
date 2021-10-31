import { Page } from '../../util/page';
import { EntityRepository, ILike, Repository } from 'typeorm';
import { Student } from './student.entity';
import { StudentDTO } from './student.dto';

interface GetStudentsProps {
  name: string;
  take: number;
  page: number;
}

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudents({
    name,
    take,
    page,
  }: GetStudentsProps): Promise<Page<StudentDTO>> {
    const [data, count] = await this.findAndCount({
      where: { name: ILike(`%${name}%`) },
      order: { name: 'ASC' },
      take,
      skip: take * (page - 1),
    });
    return {
      currentPage: page,
      data: data.map((student) => new StudentDTO(student)),
      pages: Math.ceil(count / take),
    };
  }
}
