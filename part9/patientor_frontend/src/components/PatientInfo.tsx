import { useState, useEffect } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import patientService from '../services/patients';
import { Patient } from '../types';

const PatientInfo = () => {
  const { pathname } = useLocation();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const regex = /\/patients\/(.*)/;
    const match = pathname.match(regex);
    const id = match && match[1] ? match[1] : '';
    if (id) {
      patientService.getOne(id).then((data: Patient) => {
        setPatient(data);
      });
    }
  }, []);

  const style = {
    margin: "20px 0",
    alignItems: "center",
  };

  function genderIcon(gender: string | undefined) {
    switch(gender) {
      case 'female':
        return <FemaleIcon />;
      case 'male':
        return <MaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  }

  return (
    <div>
      <Stack direction="row" spacing={2} sx={style}>
        <h3>{ patient?.name }</h3>
        { genderIcon(patient?.gender) } 
      </Stack>
      <p>{ patient?.gender }</p>
      <p>Date of Birth: { patient?.dateOfBirth }</p>
      <p>SSN: { patient?.ssn }</p>
      <p>Occupation: { patient?.occupation }</p>
    </div>
  );
};

export default PatientInfo;