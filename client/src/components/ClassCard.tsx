import { useRouter } from 'next/dist/client/router';

interface Props {
  id: string;
  course: string;
  name: string;
  students: number;
  active: boolean;
}
export default function ClassCard(props: Props) {
  const router = useRouter();

  const handleOnClick = (id: string) => {
    router.push(`classes/${id}/edit`);
  };

  const { id, course, name, students = 0, active } = props;
  return (
    <div
      onClick={() => handleOnClick(id)}
      className={`flex justify-between ${
        active ? 'bg-white' : 'bg-gray-300'
      } p-5 ml-5 mr-5 mt-5 rounded-md shadow-xl hover:bg-red-300 active:bg-red-400`}
    >
      <div className="flex flex-col">
        <span className="font-bold text-xl mb-2">{course}</span>
        <span className="font-light text-sm">
          {name} {!active ? ' - Encerrada' : ''}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-center text-3xl font-bold">{students}</span>
        <span className="text-center text-xs font-light uppercase">Alunos</span>
      </div>
    </div>
  );
}
