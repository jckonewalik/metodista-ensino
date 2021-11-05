import { Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Header from '../../components/Header';
import buildClient from '../../api/build-client';
import { getTeachers } from '../../api/teachers.api';
import { TeacherDTO } from '../../domain/teacher.dto';
import { Page } from '../../util/page';
import { Pagination } from '@material-ui/core';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface TeachersPageProps {
  data: Page<TeacherDTO>;
}

const TeachersPage: NextPage<TeachersPageProps> = (params) => {
  const router = useRouter();
  const addNewTeacher = () => {
    router.push('/teachers/new');
  };
  const [data, setData] = useState(params.data);
  const [searchName, setSearchName] = useState('');
  const handleEditTeacher = (id: string) => {
    router.push(`teachers/${id}/edit`);
  };
  const handlePageChange = async (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    await searchTeacher(searchName, page);
  };
  const delayTimer = useRef<NodeJS.Timeout>();
  const searchTeacher = async (name: string, page: number) => {
    const newData = await getTeachers(axios, name, page);
    setData(newData);
  };
  useEffect(() => {
    if (searchName.trim().length > 3 || searchName === '') {
      clearTimeout(delayTimer.current!);
      delayTimer.current = setTimeout(() => {
        searchTeacher(searchName, 1);
      }, 2000);
    }
  }, [searchName]);

  return (
    <div className=" flex flex-col h-screen relative">
      <Header title="Professores" />
      <div className="flex-1 flex flex-col h-5/6">
        <TextField
          style={{ margin: 20 }}
          label="Buscar"
          value={searchName}
          variant="standard"
          onChange={(element) => setSearchName(element.target.value)}
        />
        <div className="flex-1 overflow-y-auto">
          {data?.data.map((teacher) => (
            <div
              key={teacher.id}
              className="flex m-2 ml-4 mr-4 p-2 items-center justify-between bg-gray-200 rounded-md"
            >
              <span>{teacher.name}</span>
              <div>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEditTeacher(teacher.id!!)}
                >
                  <EditIcon />
                </Fab>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center pt-5 pb-5">
          <Pagination
            page={data.currentPage}
            count={data.pages}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <div className="absolute right-10 bottom-10">
        <Fab color="primary" aria-label="add" onClick={addNewTeacher}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient({ ctx: context });
  const data = await getTeachers(client, '', 1);
  return { props: { data } };
};

export default TeachersPage;
