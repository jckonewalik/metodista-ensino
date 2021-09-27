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
import { NextPage } from 'next';
import { SyntheticEvent, useState } from 'react';
import Header from '../../../components/Header';

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

const NewClassPage: NextPage = () => {
  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  const courses = [
    {
      label: 'Fundamentos da Fé',
      id: 1,
    },
    {
      label: 'CDV',
      id: 2,
    },
  ];
  const [tab, setTab] = useState(0);
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
          <form onSubmit={handleOnSubmit} className="flex flex-col p-5">
            <Autocomplete
              className=""
              disablePortal
              onChange={(event, newValue) => console.log(newValue)}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              id="combo-course"
              options={courses}
              renderInput={(params) => (
                <TextField {...params} label="Curso" variant="standard" />
              )}
            />
            <TextField className="mt-5" label="Nome" variant="standard" />
            <FormControlLabel
              className="mt-5"
              control={<Checkbox defaultChecked />}
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
        <Button variant="outlined" startIcon={<Cancel />}>
          Cancelar
        </Button>
        <Button variant="contained" endIcon={<Save />}>
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default NewClassPage;
