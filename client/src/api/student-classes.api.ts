import axios from 'axios';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
} from '../domain/student-class.dto';

export const postStudentClasses = async (
  studentClass: InsertStudentClassDTO
): Promise<StudentClassDTO> => {
  return await (
    await axios.post('/api/studentclasses', studentClass)
  ).data;
};
