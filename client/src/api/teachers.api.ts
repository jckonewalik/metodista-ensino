import { AxiosInstance } from 'axios';
import { InsertTeacherDTO, TeacherDTO } from '../domain/teacher.dto';
import { Page } from '../util/page';

export const getTeacher = async (
  client: AxiosInstance,
  id: string
): Promise<TeacherDTO> => {
  return (await client.get(`/api/teachers/${id}`)).data;
};

export const getTeachers = async (
  client: AxiosInstance,
  name: string,
  page: number
): Promise<Page<TeacherDTO>> => {
  return (
    await client.get(`/api/teachers`, {
      params: {
        name,
        page,
        take: 10,
      },
    })
  ).data;
};

export const postTeachers = async (
  client: AxiosInstance,
  teacher: InsertTeacherDTO
): Promise<TeacherDTO> => {
  return (await client.post('/api/teachers', teacher)).data;
};

export const putTeachers = async (
  client: AxiosInstance,
  id: string,
  teacher: InsertTeacherDTO
): Promise<TeacherDTO> => {
  return (await client.put(`/api/teachers/${id}`, teacher)).data;
};
