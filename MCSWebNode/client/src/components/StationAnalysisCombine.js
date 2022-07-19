import React from 'react';
import StationPieChart from './StationPieChart';
import Grid from '@mui/material/Grid';
import { Line } from '@ant-design/plots';
import Station40Analysis from './Station40Analysis';


const convertTime = (dt) => {
    if (dt.charAt(dt.length - 1) === 'Z'){
        let r = dt.replace('T', ' ').slice(0, -5);
        return r;
    }
    else {
        return dt;
    }
}

const StationAnalysisCombine = ({stationAllData}) => {

    


      if (stationAllData !== null && (stationAllData[0].tagName === "RejectCode" || stationAllData[0].tagName === "ScannerCode" )){
        //station 40的情况
        return <Station40Analysis stationData40AllData={stationAllData}/>;
    
      }
      else if (stationAllData !== null && stationAllData[0].TagStatus === null && (stationAllData[0].tagName !== "RejectCode" || stationAllData[0].tagName !== "ScannerCode" )){
        //station 30的情况
        let dataToPrintStation30 = stationAllData;
        let minNum = 1000;
        if (dataToPrintStation30 != null){
            for(let i = 0; i < dataToPrintStation30.length; i++) {
                if (dataToPrintStation30[i].tagValue < minNum){
                    minNum = dataToPrintStation30[i].tagValue;
                }

                dataToPrintStation30[i].StartTime = convertTime(dataToPrintStation30[i].StartTime);
                dataToPrintStation30[i].EndTime = convertTime(dataToPrintStation30[i].EndTime);

            }
        }

        let makeAllHide = {};
        for(let i = 0; i < dataToPrintStation30.length; i++) {
            makeAllHide[dataToPrintStation30[i].tagName] = false;
        }

        const config = {
            data: dataToPrintStation30,
            xField: 'EndTime',
            yField: 'tagValue',
            seriesField: 'tagName',
            xAxis: {
                // type: 'time',
                tickCount: 10,
                label:{
                    rotate:0.2,
                },
            },
            yAxis: {
                min: minNum,
            },
            slider: {
              start: 0,
              end: 1,
            },
            legend: {
              layout: 'vertical',
              position: 'left',
              selected: makeAllHide,
              
            },
          };

          return <Line {...config} />;
          
      }
      else if (stationAllData !== null && (stationAllData[0].TagStatus.toUpperCase() === "OK" || stationAllData[0].TagStatus.toUpperCase() === "NOK")){
        //station 10 and 20的情况
        // data 结构为 = [
        //     [ {tag:'Nut1', status:'OK', value:0,}, {tag:'Nut1', status:'NOK', value:0,} ],
        //     [ {tag:'Nut2', status:'OK', value:0,}, {tag:'Nut2', status:'NOK', value:0,} ],
        //     ...
        // ];
        let data = [];
    
        for(let i = 0; i < stationAllData.length; i++) {
            let isFind = false;
            for(let j = 0; j < data.length; j++) {
                if (stationAllData[i].tagName === data[j][0].tag){
                    if (stationAllData[i].TagStatus.toUpperCase() === data[j][0].status){
                        data[j][0].value ++;
                    }
                    else {
                        data[j][1].value ++;
                    }
                    isFind = true;
                }
            }
        
            if (!isFind){
                data.push([{tag:stationAllData[i].tagName, status:"OK", value:0}, {tag:stationAllData[i].tagName, status:"NOK", value:0}]);
                i--;
            }
        
        }

          return (
              <div>
                  
                <Grid container spacing={0} columns={3}>
                    {data.map(function(object, i){
                        return  (<Grid item xs={1}>
                                    <StationPieChart dataToPaint={object}/>
                                </Grid>);
                    })}
                </Grid>
              </div>
          );
      }
      else {
          return(<div></div>);
      }





};

export default StationAnalysisCombine;

