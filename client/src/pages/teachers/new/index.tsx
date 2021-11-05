import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { postTeachers } from '../../../api/teachers.api';
import AppAlert from '../../../components/AppAlert';
import Header from '../../../components/Header';
import PersonForm from '../../../components/PersonForm';
import { TeacherDTO } from '../../../domain/teacher.dto';

interface Errors {
  isError: boolean;
  messages: string[];
}

const NewTeacherPage: NextPage = () => {
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const router = useRouter();
  const saveTeacher = async (teacher: TeacherDTO) => {
    try {
      await postTeachers(axios, {
        name: teacher.name,
        gender: teacher.gender,
      });
      setMessages({
        isError: false,
        messages: ['Professor cadastrado com sucesso'],
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
      <Header title="Novo Professor" />
      <PersonForm
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

export default NewTeacherPage;
