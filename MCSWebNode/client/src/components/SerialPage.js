import * as React from 'react';
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import StationSectionBar from './StationSectionBar';


const SerialPage = () => {

  let  id  = useLocation().state.id;

  const navigate = useNavigate();


  return (
    <div >
        <Button onClick={() => navigate(-1)} variant="contained" color='primary'>GO BACK</Button>
        <StationSectionBar sendID={id.toString()}/>

    </div>
  );
}

export default SerialPage;
