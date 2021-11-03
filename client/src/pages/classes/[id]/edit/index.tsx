import { GetServerSideProps, NextPage } from 'next';
import Header from '../../../../components/Header';
import buildClient from '../../../../api/build-client';
import { CourseDTO } from '../../../../domain/course.dto';
import { StudentClassDTO } from '../../../../domain/student-class.dto';
import StudentClassForm from '../../../../components/StudentClassForm';
import {
  getStudentClass,
  putStudentClasses,
} from '../../../../api/student-classes.api';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import AppAlert from '../../../../components/AppAlert';
import axios from 'axios';

interface EditClassPagePros {
  studentClass?: StudentClassDTO;
  courses: CourseDTO[];
}

interface Errors {
  isError: boolean;
  messages: string[];
}

const EditStudentClassPage: NextPage<EditClassPagePros> = ({
  studentClass,
  courses,
}) => {
  const router = useRouter();
  if (!studentClass) {
    router.push('/classes');
  }
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const saveStudentClass = async (studentClass: StudentClassDTO) => {
    try {
      await putStudentClasses(axios, studentClass.id!!, {
        name: studentClass.name,
        isActive: studentClass.isActive,
        students: studentClass.students.map((s) => s.id!),
      });
      setMessages({
        isError: false,
        messages: ['Turma atualizada com sucesso'],
      });
    } catch (err) {
      setMessages({
        isError: true,
        //@ts-ignore
        messages: err.response.data.errors.map((err) => err.message),
      });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-red-100">
      <Header title="Alterar Turma" />
      <StudentClassForm
        courses={courses}
        studentClass={studentClass}
        onSave={saveStudentClass}
        onCancel={() => {
          router.push('/classes');
        }}
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
  //@ts-ignore
  const { id } = context.params;
  const client = buildClient({ ctx: context });
  try {
    const studentClass = await getStudentClass(client, id);
    const courses = [studentClass.course];

    return { props: { studentClass, courses } };
  } catch (err) {
    return { props: { studentClass: undefined, courses: undefined } };
  }
};

export default EditStudentClassPage;
