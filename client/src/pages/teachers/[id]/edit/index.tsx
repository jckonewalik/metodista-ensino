import { GetServerSideProps, NextPage } from 'next';
import Header from '../../../../components/Header';
import buildClient from '../../../../api/build-client';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import AppAlert from '../../../../components/AppAlert';
import axios from 'axios';
import { TeacherDTO } from '../../../../domain/teacher.dto';
import { getTeacher, putTeachers } from '../../../../api/teachers.api';
import PersonForm from '../../../../components/PersonForm';

interface EditTeacherPagePros {
  teacher?: TeacherDTO;
}

interface Errors {
  isError: boolean;
  messages: string[];
}

const EditTeacherPage: NextPage<EditTeacherPagePros> = ({ teacher }) => {
  const router = useRouter();
  if (!teacher) {
    router.push('/teachers');
  }
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const saveTeacher = async (teacher: TeacherDTO) => {
    try {
      await putTeachers(axios, teacher.id!!, {
        name: teacher.name,
        gender: teacher.gender,
      });
      setMessages({
        isError: false,
        messages: ['Professor atualizado com sucesso'],
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
      <Header title="Alterar Professor" />
      <PersonForm
        person={teacher}
        onSave={saveTeacher}
        onCancel={() => {
          router.push('/teachers');
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
    const teacher = await getTeacher(client, id);
    return { props: { teacher } };
  } catch (err) {
    return { props: { teacherClass: undefined, courses: undefined } };
  }
};

export default EditTeacherPage;
