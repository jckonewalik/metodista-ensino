import { AxiosInstance } from 'axios';
import { InsertStudentDTO, StudentDTO } from '../domain/student.dto';
import { Page } from '../util/page';

export const getStudent = async (
  client: AxiosInstance,
  id: string
): Promise<StudentDTO> => {
  return (await client.get(`/api/students/${id}`)).data;
};

export const getStudents = async (
  client: AxiosInstance,
  name: string,
  page: number
): Promise<Page<StudentDTO>> => {
  return (
    await client.get(`/api/students`, {
      params: {
        name,
        page,
        take: 10,
      },
    })
  ).data;
};

export const postStudents = async (
  client: AxiosInstance,
  student: InsertStudentDTO
): Promise<StudentDTO> => {
  return (await client.post('/api/students', student)).data;
};

export const putStudents = async (
  client: AxiosInstance,
  id: string,
  student: InsertStudentDTO
): Promise<StudentDTO> => {
  return (await client.put(`/api/students/${id}`, student)).data;
};
