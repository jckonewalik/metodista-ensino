import { StudentClassSummaryDTO } from '../domain/student-class.dto';

interface Props {
  studentClass: StudentClassSummaryDTO;
  onClick: () => void;
}
export default function ClassCard({ studentClass, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between ${
        studentClass.isActive ? 'bg-white' : 'bg-gray-300'
      } p-5 ml-5 mr-5 mt-5 rounded-md shadow-xl hover:cursor-pointer hover:bg-red-300 active:bg-red-400`}
    >
      <div className="flex flex-col">
        <span className="font-bold text-xl mb-2">{studentClass.course}</span>
        <span className="font-light text-sm">
          {studentClass.name} {!studentClass.isActive ? ' - Encerrada' : ''}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-center text-3xl font-bold">
          {studentClass.numberOfStudents}
        </span>
        <span className="text-center text-xs font-light uppercase">Alunos</span>
      </div>
    </div>
  );
}
