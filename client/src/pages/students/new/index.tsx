import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { postStudents } from '../../../api/students.api';
import AppAlert from '../../../components/AppAlert';
import Header from '../../../components/Header';
import StudentForm from '../../../components/StudentForm';
import { StudentDTO } from '../../../domain/student.dto';

interface Errors {
  isError: boolean;
  messages: string[];
}

const NewStudentPage: NextPage = () => {
  const [messages, setMessages] = useState<Errors>({
    isError: false,
    messages: [],
  });
  const router = useRouter();
  const saveStudent = async (student: StudentDTO) => {
    try {
      await postStudents(axios, {
        name: student.name,
        gender: student.gender,
      });
      setMessages({
        isError: false,
        messages: ['Aluno cadastrado com sucesso'],
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
      <Header title="Novo Aluno" />
      <StudentForm
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

export default NewStudentPage;
