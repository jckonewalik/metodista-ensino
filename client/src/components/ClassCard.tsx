interface Props {
  id: string;
  course: string;
  name: string;
  students: number;
}
export default function ClassCard(props: Props) {
  const { id, course, name, students } = props;
  return (
    <div className="flex justify-between bg-white p-5 ml-5 mr-5 mt-5 rounded-md shadow-xl hover:bg-gray-200 active:bg-gray-300">
      <div className="flex flex-col">
        <span className="text-gray-700 font-bold text-xl mb-2">{course}</span>
        <span className="text-gray-700 font-light text-sm">{name}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-center text-3xl text-gray-700 font-bold">
          {students}
        </span>
        <span className="text-center text-xs font-light uppercase">Alunos</span>
      </div>
    </div>
  );
}
