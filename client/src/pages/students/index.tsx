import { Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Header from '../../components/Header';
import buildClient from '../../api/build-client';
import { getStudents } from '../../api/students.api';
import { StudentDTO } from '../../domain/student.dto';
import { Page } from '../../util/page';
import { Pagination } from '@material-ui/core';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface StudentsPageProps {
  data: Page<StudentDTO>;
}

const StudentsPage: NextPage<StudentsPageProps> = (params) => {
  const router = useRouter();
  const addNewStudent = () => {
    router.push('/students/new');
  };
  const [data, setData] = useState(params.data);
  const [searchName, setSearchName] = useState('');
  const handleEditStudent = (id: string) => {
    router.push(`students/${id}/edit`);
  };
  const handlePageChange = async (
    event: ChangeEvent<unknown>,
    page: number
  ) => {
    await searchStudent(searchName, page);
  };
  const delayTimer = useRef<NodeJS.Timeout>();
  const searchStudent = async (name: string, page: number) => {
    const newData = await getStudents(axios, name, page);
    setData(newData);
  };
  useEffect(() => {
    if (searchName.trim().length > 3 || searchName === '') {
      clearTimeout(delayTimer.current!);
      delayTimer.current = setTimeout(() => {
        searchStudent(searchName, 1);
      }, 2000);
    }
  }, [searchName]);

  return (
    <div className=" flex flex-col h-screen relative">
      <Header title="Alunos" />
      <div className="flex-1 flex flex-col h-5/6">
        <TextField
          style={{ margin: 20 }}
          label="Buscar"
          value={searchName}
          variant="standard"
          onChange={(element) => setSearchName(element.target.value)}
        />
        <div className="flex-1 overflow-scroll">
          {data?.data.map((student) => (
            <div
              key={student.id}
              className="flex m-2 ml-4 mr-4 p-2 items-center justify-between bg-gray-200 rounded-md"
            >
              <span>{student.name}</span>
              <div>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEditStudent(student.id!!)}
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
        <Fab color="primary" aria-label="add" onClick={addNewStudent}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient({ ctx: context });
  const data = await getStudents(client, '', 1);
  return { props: { data } };
};

export default StudentsPage;
