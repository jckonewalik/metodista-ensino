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
import { StudentDTO } from '../domain/student.dto';

interface StudentFormProps {
  student?: StudentDTO;
  onSave: (student: StudentDTO) => void;
  onCancel: () => void;
}

export default function StudentForm({
  student,
  onSave,
  onCancel,
}: StudentFormProps) {
  const [state, setState] = useState<StudentDTO>(
    student == undefined ? new StudentDTO() : student
  );
  const genders = [
    { code: 'M', description: 'Masculino' },
    { code: 'F', description: 'Feminino' },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-white flex-1">
        <form className="flex flex-col p-5">
          <TextField
            label="Nome"
            value={state.name}
            variant="standard"
            onChange={(element) =>
              setState({ ...state, name: element.target.value })
            }
          />
          <Autocomplete
            style={{ marginTop: 10 }}
            disablePortal
            value={genders.find((gender) => gender.code === state.gender)}
            onChange={(event, newValue) => {
              setState({ ...state, gender: newValue?.code });
            }}
            getOptionLabel={(option) => option.description}
            isOptionEqualToValue={(option, value) => {
              return option?.code === value?.code;
            }}
            id="combo-course"
            options={genders}
            renderInput={(params) => (
              <TextField {...params} label="Gênero" variant="standard" />
            )}
          />
        </form>
      </div>
      <div className="flex flex-row justify-between p-5">
        <Button variant="outlined" startIcon={<Cancel />} onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          endIcon={<Save />}
          onClick={async () => {
            await onSave(state);
            if (!state.id) {
              setState(new StudentDTO());
            }
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
