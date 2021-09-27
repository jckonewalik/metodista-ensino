import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import ClassCard from '../../components/ClassCard';
import Header from '../../components/Header';

const ClassesPage: NextPage = () => {
  const router = useRouter();
  const handleAddClick = () => {
    router.push('/classes/edit');
  };
  return (
    <div className=" bg-red-100 h-screen relative">
      <Header />
      <div className="grid auto-rows-min h-5/6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll">
        <ClassCard
          id="1"
          course="Fundamentos da Fé"
          name="Turma 1 - 2021"
          students={10}
        />
        <ClassCard
          id="2"
          course="Fundamentos da Fé"
          name="Turma 1 - 2021"
          students={20}
        />
        <ClassCard id="3" course="CDV" students={30} name="Turma 1 - 2021" />
        <ClassCard
          id="4"
          course="Homem ao Máximo"
          name="Turma 1 - 2021"
          students={4}
        />
        <ClassCard
          id="5"
          course="Curso de Casais"
          name="Turma 1 - 2021"
          students={15}
        />
      </div>
      <Fab
        className="absolute right-10 bottom-10"
        color="primary"
        aria-label="add"
        onClick={handleAddClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default ClassesPage;
