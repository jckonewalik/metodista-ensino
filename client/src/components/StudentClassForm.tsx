import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  Tabs,
  Box,
  Tab,
  Button,
  Fab,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { Save, Cancel } from '@mui/icons-material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { CourseDTO } from '../domain/course.dto';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
} from '../domain/student-class.dto';
import { StudentDTO } from '../domain/student.dto';
import { getStudents } from '../api/students.api';
import axios from 'axios';
import { TeacherDTO } from '../domain/teacher.dto';
import { getTeachers } from '../api/teachers.api';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return value === index ? (
    <div
      role="tabpanel"
      id={`class-tabpanel-${index}`}
      aria-labelledby={`class-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  ) : null;
}

interface StudentClassFormProps {
  studentClass?: StudentClassDTO;
  courses: CourseDTO[];
  onSave: (studentClass: StudentClassDTO) => void;
  onCancel: () => void;
}

export default function StudentClassForm({
  studentClass,
  courses,
  onSave,
  onCancel,
}: StudentClassFormProps) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setTab(value);
  };
  const [state, setState] = useState<StudentClassDTO>(
    studentClass == undefined ? new StudentClassDTO() : studentClass
  );
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [teachers, setTeachers] = useState<TeacherDTO[]>([]);
  const [studentInputSearch, setStudentInputSearch] = useState('');
  const [teacherInputSearch, setTeacherInputSearch] = useState('');
  const delayTimer = useRef<NodeJS.Timeout>();
  const searchStudent = async (name: string, page: number) => {
    const response = await getStudents(axios, name, page);
    setStudents(
      response.data.filter(
        (s) => !state.students.some((student) => student.id === s.id)
      )
    );
  };
  const searchTeacher = async (name: string, page: number) => {
    const response = await getTeachers(axios, name, page);
    setTeachers(
      response.data.filter(
        (s) => !state.teachers.some((teacher) => teacher.id === s.id)
      )
    );
  };
  useEffect(() => {
    if (studentInputSearch.trim().length > 3) {
      clearTimeout(delayTimer.current!);
      delayTimer.current = setTimeout(() => {
        searchStudent(studentInputSearch, 1);
      }, 1000);
    }
  }, [studentInputSearch]);
  useEffect(() => {
    if (teacherInputSearch.trim().length > 3) {
      clearTimeout(delayTimer.current!);
      delayTimer.current = setTimeout(() => {
        searchTeacher(teacherInputSearch, 1);
      }, 1000);
    }
  }, [teacherInputSearch]);
  const handleStudentSelect = (student: StudentDTO | null) => {
    if (student && !state.students.some((s) => s.id === student.id)) {
      setState({ ...state, students: [...state.students, student] });
      setStudents(students.filter((s) => s.id !== student.id));
      setStudentInputSearch('');
    }
  };
  const handleTeacherSelect = (teacher: TeacherDTO | null) => {
    if (teacher && !state.teachers.some((s) => s.id === teacher.id)) {
      setState({ ...state, teachers: [...state.teachers, teacher] });
      setTeachers(students.filter((s) => s.id !== teacher.id));
      setTeacherInputSearch('');
    }
  };
  const removeStudent = (id: string) => {
    setState({ ...state, students: state.students.filter((s) => s.id !== id) });
  };
  const removeTeacher = (id: string) => {
    setState({ ...state, teachers: state.teachers.filter((s) => s.id !== id) });
  };
  return (
    <div className="flex flex-1 flex-col bg-red-100">
      <div className="flex flex-col flex-1 bg-white">
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
        <TabPanel index={0} value={tab} className="flex flex-col p-5">
          <form className="flex flex-col">
            <Autocomplete
              style={{ marginBottom: 20 }}
              disabled={state.id !== undefined}
              disablePortal
              value={state.course}
              onChange={(event, newValue) => {
                setState({ ...state, course: newValue });
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
              style={{ marginTop: 10 }}
              label="Nome"
              value={state.name}
              variant="standard"
              onChange={(element) =>
                setState({ ...state, name: element.target.value })
              }
            />
            <FormControlLabel
              className="mt-5"
              control={
                <Checkbox
                  checked={state.isActive}
                  onChange={(event) =>
                    setState({ ...state, isActive: event.target.checked })
                  }
                />
              }
              label="Ativo"
            />
          </form>
        </TabPanel>
        <TabPanel index={1} value={tab} className="flex flex-col p-5">
          <Autocomplete
            style={{ marginBottom: 20 }}
            options={teachers}
            id="combo-teachers"
            filterOptions={(x) => x}
            getOptionLabel={(option) => option.name!}
            onInputChange={(event, newInputValue) => {
              setTeacherInputSearch(newInputValue);
            }}
            onChange={(event: any, value: TeacherDTO | null) =>
              handleTeacherSelect(value)
            }
            renderInput={(params) => (
              <TextField {...params} label="Buscar" variant="standard" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <div className="max-h-1/2-screen overflow-y-auto">
            {state.teachers
              .sort((a, b) => a.name?.localeCompare(b.name || '') || 0)
              .map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex mt-2 mb-2 p-2 items-center justify-between bg-gray-200 rounded-md"
                >
                  <span>{teacher.name}</span>
                  <div>
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => removeTeacher(teacher.id!)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>
        <TabPanel index={2} value={tab} className="flex flex-col p-5">
          <Autocomplete
            style={{ marginBottom: 20 }}
            options={students}
            id="combo-students"
            filterOptions={(x) => x}
            getOptionLabel={(option) => option.name!}
            onInputChange={(event, newInputValue) => {
              setStudentInputSearch(newInputValue);
            }}
            onChange={(event: any, value: StudentDTO | null) =>
              handleStudentSelect(value)
            }
            renderInput={(params) => (
              <TextField {...params} label="Buscar" variant="standard" />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <div className="max-h-1/2-screen overflow-y-auto">
            {state.students
              .sort((a, b) => a.name?.localeCompare(b.name || '') || 0)
              .map((student) => (
                <div
                  key={student.id}
                  className="flex mt-2 mb-2 p-2 items-center justify-between bg-gray-200 rounded-md"
                >
                  <span>{student.name}</span>
                  <div>
                    <Fab
                      size="small"
                      color="primary"
                      onClick={() => removeStudent(student.id!)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </div>
                </div>
              ))}
          </div>
        </TabPanel>
      </div>
      <div className="flex flex-row justify-between p-5">
        <Button variant="outlined" startIcon={<Cancel />} onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          endIcon={<Save />}
          onClick={() => onSave(state)}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
