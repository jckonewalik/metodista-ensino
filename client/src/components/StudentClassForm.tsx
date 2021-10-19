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
import { SyntheticEvent, useState } from 'react';
import { CourseDTO } from '../domain/course.dto';
import {
  InsertStudentClassDTO,
  StudentClassDTO,
} from '../domain/student-class.dto';

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
  onSave: (studentClass: InsertStudentClassDTO) => void;
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
              className="mt-5"
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
      <div className="flex flex-row justify-between p-5">
        <Button variant="outlined" startIcon={<Cancel />} onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          endIcon={<Save />}
          onClick={() =>
            onSave({
              name: state.name,
              isActive: state.isActive,
              courseId: state.course?.id,
            })
          }
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
