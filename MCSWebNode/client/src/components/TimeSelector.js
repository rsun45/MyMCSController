import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';


const TimeSelector = ({data, setData}) => {

    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());

    const compareDateTime = ( t1, t2) => {
        let time1 = new Date(t1);
        let time2 = new Date(t2);
        time2.setHours(time2.getHours()+4)
        // console.log(time1);
        // console.log(time2);

        if (time1.getTime() < time2.getTime())
            return -1;
        else if (time1.getTime() > time2.getTime())
            return 1;
        else
            return 0;

    }

    const toggleButton = async () => {

        let arr = await fetch("/api/data01").then(res => res.json());

        // fetch("/api/data01")
        //     .then((res) => res.json())
        //     .then((getData) => arr = getData);

        let i = arr.length
        let index = 0;
        while (i--) {
            
            if (compareDateTime(startTime,arr[index].EndTime)===1 || compareDateTime(endTime,arr[index].StartTime)===-1) { 
                arr.splice(index, 1);
                index--;
            } 
            index++;
        }
        
        setData(arr);
        // console.log(data);
        // compareDateTime(startTime,arr[0].StartTime);

    }

    const toggleButtonClear = async () => {
        let arr = await fetch("/api/data01").then(res => res.json());
        setData(arr);
    }


  return (
    <div >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Start"
        value={startTime}
        onChange={(newValue) => {
            setStartTime(newValue);
        }}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="End"
        value={endTime}
        onChange={(newValue) => {
            setEndTime(newValue);
        }}
      />
    </LocalizationProvider>

    <Button sx={{ margin: '10px' }} onClick={toggleButton} variant="contained" color='info'>UPDATE</Button>
    <Button sx={{ margin: '10px' }} onClick={toggleButtonClear} variant="contained" color='info'>CLEAR</Button>


    </div>
  );
}

export default TimeSelector;
