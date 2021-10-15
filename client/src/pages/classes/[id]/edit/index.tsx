import { GetServerSideProps, NextPage } from 'next';
import Header from '../../../../components/Header';
import buildClient from '../../../../api/build-client';
import { CourseDTO } from '../../../../domain/course.dto';
import { StudentClassDTO } from '../../../../domain/student-class.dto';
import StudentClassForm from '../../../../components/StudentClassForm';

interface EditClassPagePros {
  studentClass?: StudentClassDTO;
  courses: CourseDTO[];
}

const EditClassPage: NextPage<EditClassPagePros> = ({
  studentClass,
  courses,
}) => {
  return (
    <div className="flex flex-col h-screen bg-red-100">
      <Header />
      <StudentClassForm
        action="update"
        courses={courses}
        studentClass={studentClass}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //@ts-ignore
  const { id } = context.params;
  const client = buildClient({ ctx: context });
  let studentClass;
  try {
    studentClass = (await client.get(`/api/studentclasses/${id}`)).data;
  } catch (err) {
    studentClass = undefined;
  }
  const courses = await (await client.get('/api/courses')).data;
  return { props: { studentClass, courses } };
};

export default EditClassPage;
