import { AxiosInstance, AxiosResponse } from 'axios';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
  UpdateStudentClassDTO,
} from '../domain/student-class.dto';
import { InsertStudentDTO } from '../domain/student.dto';

export const getStudentClass = async (
  client: AxiosInstance,
  id: string
): Promise<StudentClassDTO> => {
  return (await client.get(`/api/studentclasses/${id}`)).data;
};

export const postStudentClasses = async (
  client: AxiosInstance,
  studentClass: InsertStudentClassDTO
): Promise<StudentClassDTO> => {
  return (
    await client.post<InsertStudentDTO, AxiosResponse<StudentClassDTO>>(
      '/api/studentclasses',
      studentClass
    )
  ).data;
};

export const putStudentClasses = async (
  client: AxiosInstance,
  id: string,
  studentClass: UpdateStudentClassDTO
): Promise<StudentClassDTO> => {
  return (
    await client.put<UpdateStudentClassDTO, AxiosResponse<StudentClassDTO>>(
      `/api/studentclasses/${id}`,
      studentClass
    )
  ).data;
};
