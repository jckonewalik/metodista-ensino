import { Page } from '../../util/page';
import { EntityRepository, ILike, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { TeacherDTO } from './teacher.dto';

interface GetTeachersProps {
  name: string;
  take: number;
  page: number;
}

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  async getTeachers({
    name,
    take,
    page,
  }: GetTeachersProps): Promise<Page<TeacherDTO>> {
    const [data, count] = await this.findAndCount({
      where: { name: ILike(`%${name}%`) },
      order: { name: 'ASC' },
      take,
      skip: take * (page - 1),
    });
    return {
      currentPage: page,
      data: data.map((teacher) => new TeacherDTO(teacher)),
      pages: Math.ceil(count / take),
    };
  }
}
