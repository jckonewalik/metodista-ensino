import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import ClassCard from '../../components/ClassCard';
import Header from '../../components/Header';
import buildClient from '../../api/build-client';
import { StudentClassSummaryDTO } from '../../domain/student-class.dto';

interface ClassesPagePros {
  studentClasses: StudentClassSummaryDTO[];
}

const ClassesPage: NextPage<ClassesPagePros> = ({ studentClasses }) => {
  const router = useRouter();
  const handleAddClick = () => {
    router.push('/classes/new');
  };
  return (
    <div className=" bg-red-100 h-screen relative">
      <Header />
      <div className="grid auto-rows-min h-5/6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll">
        {studentClasses.map((studentClass) => (
          <ClassCard
            key={studentClass.id}
            id={studentClass.id}
            course={studentClass.course}
            name={studentClass.name}
            students={studentClass.numberOfStudents}
            active={studentClass.isActive}
          />
        ))}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient({ ctx: context });
  const result = await client.get('/api/studentclasses');
  return { props: { studentClasses: result.data } };
};

export default ClassesPage;
