import { GetServerSideProps, NextPage } from 'next';
import buildClient from '../../../api/build-client';
import Header from '../../../components/Header';
import StudentClassForm from '../../../components/StudentClassForm';
import { CourseDTO } from '../../../domain/course.dto';

interface NewClassPagePros {
  courses: CourseDTO[];
}

const NewStudentClassPage: NextPage<NewClassPagePros> = ({ courses }) => {
  return (
    <div className="flex flex-col h-screen bg-red-100">
      <Header />
      <StudentClassForm action="save" courses={courses} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient({ ctx: context });
  const courses = await (
    await client.get('/api/courses', {
      params: {
        active: true,
      },
    })
  ).data;
  return { props: { courses } };
};

export default NewStudentClassPage;
