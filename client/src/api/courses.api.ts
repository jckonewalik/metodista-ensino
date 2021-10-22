import { AxiosInstance } from 'axios';
import { CourseDTO } from '../domain/course.dto';

interface GetCoursesParams {
  active?: boolean;
}

export const getCourses = async (
  client: AxiosInstance,
  params: GetCoursesParams
): Promise<CourseDTO> => {
  return (
    await client.get('/api/courses', {
      params,
    })
  ).data;
};
