import { AxiosInstance } from 'axios';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
  UpdateStudentClassDTO,
} from '../domain/student-class.dto';

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
  return (await client.post('/api/studentclasses', studentClass)).data;
};

export const putStudentClasses = async (
  client: AxiosInstance,
  id: string,
  studentClass: UpdateStudentClassDTO
): Promise<StudentClassDTO> => {
  return (await client.put(`/api/studentclasses/${id}`, studentClass)).data;
};
