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
import { SyntheticEvent, useEffect, useState } from 'react';
import { CourseDTO } from '../domain/course.dto';
import { StudentClassDTO } from '../domain/student-class.dto';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/dist/client/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

interface StudentClassFormProps {
  studentClass?: StudentClassDTO;
  courses: CourseDTO[];
  action: 'save' | 'update';
}

export default function StudentClassForm({
  studentClass,
  courses,
  action,
}: StudentClassFormProps) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTab(value);
  };
  const [name, setName] = useState('');
  const [course, setCourse] = useState<CourseDTO | undefined | null>(
    courses[0]
  );
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (studentClass) {
      setName(studentClass.name);
      setCourse(courses.find((course) => course.id === studentClass.courseId));
      setActive(studentClass.isActive);
    }
  }, [studentClass, courses]);

  const { doRequest, errors } = useRequest({
    url:
      action === 'save'
        ? '/api/studentclasses'
        : `/api/studentclasses/${studentClass?.id}`,
    method: action === 'save' ? 'post' : 'put',
    body: {
      courseId: course?.id,
      name,
      isActive: active,
    },
  });
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-white flex-1">
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
              disabled={action === 'update'}
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
      <div className="bg-white pl-2 pr-2">{errors}</div>
      <div className="flex flex-row justify-between p-5">
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button variant="contained" endIcon={<Save />} onClick={doRequest}>
          Salvar
        </Button>
      </div>
    </div>
  );
}
