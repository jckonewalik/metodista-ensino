import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  Tabs,
  Box,
  Tab,
  Button,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { SyntheticEvent, useEffect, useState } from 'react';
import Header from '../../../../components/Header';
import buildClient from '../../../../api/build-client';
import { CourseDTO } from '../../../../domain/course.dto';
import useRequest from '../../../../hooks/use-request';
import { StudentClassDTO } from '../../../../domain/student-class.dto';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface NewClassPagePros {
  studentClass?: StudentClassDTO;
  courses: CourseDTO[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`class-tabpanel-${index}`}
      aria-labelledby={`class-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const NewClassPage: NextPage<NewClassPagePros> = ({
  studentClass,
  courses,
}) => {
  const [tab, setTab] = useState(0);
  const [name, setName] = useState('');
  const [course, setCourse] = useState<CourseDTO | undefined | null>(
    courses[0]
  );
  const [active, setActive] = useState(true);
  const { doRequest, errors } = useRequest({
    url: '/api/studentclasses',
    method: 'post',
    body: {
      courseId: course?.id,
      name,
      isActive: active,
    },
  });

  useEffect(() => {
    if (studentClass) {
      setName(studentClass.name);
      setCourse(courses.find((course) => course.id === studentClass.courseId));
      setActive(studentClass.isActive);
    }
  }, [studentClass, courses]);

  const handleOnSave = async () => {
    doRequest();
  };
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTab(value);
  };
  return (
    <div className="flex flex-col h-screen bg-red-100">
      <Header />
      <div className="flex-1 bg-white">
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="inherit"
            className="bg-gradient-to-l from-red-600 to-red-400 text-white"
          >
            <Tab label="Detalhes" />
            <Tab label="Professores" />
            <Tab label="Alunos" />
          </Tabs>
        </Box>
        <TabPanel index={0} value={tab}>
          <form className="flex flex-col p-5">
            <Autocomplete
              disabled
              disablePortal
              value={course}
              onChange={(event, newValue) => {
                setCourse(newValue);
              }}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              id="combo-course"
              options={courses}
              renderInput={(params) => (
                <TextField {...params} label="Curso" variant="standard" />
              )}
            />
            <TextField
              className="mt-5"
              label="Nome"
              value={name}
              variant="standard"
              onChange={(element) => setName(element.target.value)}
            />
            <FormControlLabel
              className="mt-5"
              control={
                <Checkbox
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                />
              }
              label="Ativo"
            />
          </form>
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <form className="flex flex-col p-5">
            <Autocomplete
              options={[]}
              filterOptions={(x) => x}
              id="combo-teachers"
              renderInput={(params) => (
                <TextField {...params} label="Buscar" variant="standard" />
              )}
            />
          </form>
        </TabPanel>
        <TabPanel index={2} value={tab}>
          <form className="flex flex-col p-5">
            <Autocomplete
              options={[]}
              id="combo-students"
              renderInput={(params) => (
                <TextField {...params} label="Buscar" variant="standard" />
              )}
            />
          </form>
        </TabPanel>
      </div>
      {errors}
      <div className="flex flex-row justify-between p-5">
        <Button variant="outlined" startIcon={<Cancel />}>
          Cancelar
        </Button>
        <Button variant="contained" endIcon={<Save />} onClick={handleOnSave}>
          Salvar
        </Button>
      </div>
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

export default NewClassPage;
