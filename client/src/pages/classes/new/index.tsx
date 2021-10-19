import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import buildClient from '../../../api/build-client';
import { postStudentClasses } from '../../../api/student-classes.api';
import AppAlert from '../../../components/AppAlert';
import Header from '../../../components/Header';
import StudentClassForm from '../../../components/StudentClassForm';
import { CourseDTO } from '../../../domain/course.dto';
import { InsertStudentClassDTO } from '../../../domain/student-class.dto';

interface NewClassPagePros {
  courses: CourseDTO[];
}

interface Errors {
  isError: boolean;
  messages: string[];
}

const NewStudentClassPage: NextPage<NewClassPagePros> = ({ courses }) => {
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const router = useRouter();
  const saveStudentClass = async (studentClass: InsertStudentClassDTO) => {
    try {
      const { id } = await postStudentClasses({
        name: studentClass.name,
        isActive: studentClass.isActive,
        courseId: studentClass.courseId,
      });
      setMessages({
        isError: false,
        messages: ['Turma cadastrada com sucesso'],
      });
      router.push(`/classes/${id}/edit`);
    } catch (err) {
      setMessages({
        isError: true,
        messages: err.response.data.errors.map((err) => err.message),
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-red-100">
      <Header />
      <StudentClassForm
        courses={courses}
        onSave={saveStudentClass}
        onCancel={() => {}}
      />
      {messages.messages.length ? (
        <AppAlert
          onClose={() => setMessages({ ...messages, messages: [] })}
          messages={messages.messages}
          variant="filled"
          severity={messages.isError ? 'error' : 'success'}
        />
      ) : null}
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
