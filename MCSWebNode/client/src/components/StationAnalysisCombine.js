import React from 'react';
import StationPieChart from './StationPieChart';
import Grid from '@mui/material/Grid';

const StationAnalysisCombine = ({stationAllData}) => {

    let data = [
        {tag:'Nut1', status:'OK', value:0,},
        {tag:'Nut1', status:'NOK', value:0,},
        {tag:'Nut2', status:'OK', value:0,},
        {tag:'Nut2', status:'NOK', value:0,},
        {tag:'Nut3', status:'OK', value:0,},
        {tag:'Nut3', status:'NOK', value:0,},
        {tag:'Nut4', status:'OK', value:0,},
        {tag:'Nut4', status:'NOK', value:0,},
        {tag:'Nut5', status:'OK', value:0,},
        {tag:'Nut5', status:'NOK', value:0,},
    ];

    let temp = [0,0,0,0,0,0,0,0,0,0];
    if (stationData10AllData != null){
    for(let i = 0; i < stationData10AllData.length; i++) {
        if (stationData10AllData[i].tagName ==="Nut1" && stationData10AllData[i].TagStatus === "OK"){
            temp[0]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut1" && stationData10AllData[i].TagStatus === "NOK"){
            temp[1]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut2" && stationData10AllData[i].TagStatus === "OK"){
            temp[2]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut2" && stationData10AllData[i].TagStatus === "NOK"){
            temp[3]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut3" && stationData10AllData[i].TagStatus === "OK"){
            temp[4]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut3" && stationData10AllData[i].TagStatus === "NOK"){
            temp[5]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut4 " && stationData10AllData[i].TagStatus === "OK"){
            temp[6]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut4 " && stationData10AllData[i].TagStatus === "NOK"){
            temp[7]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut5" && stationData10AllData[i].TagStatus === "OK"){
            temp[8]++;
        }
        else if (stationData10AllData[i].tagName ==="Nut5" && stationData10AllData[i].TagStatus === "NOK"){
            temp[9]++;
        }
    
    }
    }

    for(let i = 0; i < data.length; i++) {
        data[i].value = temp[i];
    }


      return (
          <div>
              
            <Grid container spacing={0} columns={3}>
                <Grid item xs={1}>
                    <StationPieChart dataToPaint={data.slice(0,2)}/>
                </Grid>
                <Grid item xs={1}>
                    <StationPieChart dataToPaint={data.slice(2,4)}/>
                </Grid>
                <Grid item xs={1}>
                    <StationPieChart dataToPaint={data.slice(4,6)}/>
                </Grid>
            </Grid>
            <Grid container spacing={0} columns={3}>
                <Grid item xs={1}>
                    <StationPieChart dataToPaint={data.slice(6,8)}/>
                </Grid>
                <Grid item xs={1}>
                    <StationPieChart dataToPaint={data.slice(8,10)}/>
                </Grid>
            </Grid>
          </div>
      );
};

export default Station10Analysis;

