import { GetServerSideProps, NextPage } from 'next';
import Header from '../../../../components/Header';
import buildClient from '../../../../api/build-client';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import AppAlert from '../../../../components/AppAlert';
import axios from 'axios';
import { StudentDTO } from '../../../../domain/student.dto';
import { getStudent, putStudents } from '../../../../api/students.api';
import StudentForm from '../../../../components/StudentForm';

interface EditStudentPagePros {
  student?: StudentDTO;
}

interface Errors {
  isError: boolean;
  messages: string[];
}

const EditStudentPage: NextPage<EditStudentPagePros> = ({ student }) => {
  const router = useRouter();
  if (!student) {
    router.push('/students');
  }
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const saveStudent = async (student: StudentDTO) => {
    try {
      await putStudents(axios, student.id!!, {
        name: student.name,
        gender: student.gender,
      });
      setMessages({
        isError: false,
        messages: ['Aluno atualizado com sucesso'],
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
    <div className="flex flex-col h-screen bg-red-100">
      <Header title="Alterar Aluno" />
      <StudentForm
        student={student}
        onSave={saveStudent}
        onCancel={() => {
          router.push('/students');
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
    const student = await getStudent(client, id);
    return { props: { student } };
  } catch (err) {
    return { props: { studentClass: undefined, courses: undefined } };
  }
};

export default EditStudentPage;
