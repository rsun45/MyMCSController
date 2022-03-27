import React from 'react';
import StationPieChart from './StationPieChart';
import Grid from '@mui/material/Grid';

const Station20Analysis = ({stationData20AllData}) => {

    let data = [
        {tag:'Nut6', status:'OK', value:0,},
        {tag:'Nut6', status:'NOK', value:0,},
        {tag:'Nut7', status:'OK', value:0,},
        {tag:'Nut7', status:'NOK', value:0,},
        {tag:'Nut8', status:'OK', value:0,},
        {tag:'Nut8', status:'NOK', value:0,},
        {tag:'Nut9', status:'OK', value:0,},
        {tag:'Nut9', status:'NOK', value:0,},
        {tag:'Nut10', status:'OK', value:0,},
        {tag:'Nut10', status:'NOK', value:0,},
    ];

    let temp = [0,0,0,0,0,0,0,0,0,0];
    if (stationData20AllData != null){
    for(let i = 0; i < stationData20AllData.length; i++) {
        if (stationData20AllData[i].tagName ==="Nut6" && stationData20AllData[i].TagStatus === "OK"){
            temp[0]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut6" && stationData20AllData[i].TagStatus === "NOK"){
            temp[1]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut7" && stationData20AllData[i].TagStatus === "OK"){
            temp[2]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut7" && stationData20AllData[i].TagStatus === "NOK"){
            temp[3]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut8" && stationData20AllData[i].TagStatus === "OK"){
            temp[4]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut8" && stationData20AllData[i].TagStatus === "NOK"){
            temp[5]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut9" && stationData20AllData[i].TagStatus === "OK"){
            temp[6]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut9" && stationData20AllData[i].TagStatus === "NOK"){
            temp[7]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut10" && stationData20AllData[i].TagStatus === "OK"){
            temp[8]++;
        }
        else if (stationData20AllData[i].tagName ==="Nut10" && stationData20AllData[i].TagStatus === "NOK"){
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

export default Station20Analysis;

