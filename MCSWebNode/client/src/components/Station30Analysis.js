import React from 'react';
import { Line } from '@ant-design/plots';



const convertTime = (dt) => {
    if (dt.charAt(dt.length - 1) === 'Z'){
        let r = dt.replace('T', ' ').slice(0, -5);
        return r;
    }
    else {
        return dt;
    }
}

const Station30Analysis = ({stationData30AllData}) => {

    
    let dataToPrintStation30 = stationData30AllData;
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
          selected: {
            'Nut1':false, 'Nut1 LL':false, 'Nut1 UL':false, 'Nut2':false, 'Nut2 LL':false, 'Nut2 UL':false, 'Nut3':false, 'Nut3 LL':false, 'Nut3 UL':false,
            'Nut4 ':false, 'Nut4 LL':false, 'Nut4 UL':false, 'Nut5':false, 'Nut5 LL':false, 'Nut5 UL':false, 'Nut6':false, 'Nut6 LL':false, 'Nut6 UL':false,
            'Nut7':false, 'Nut7 LL':false, 'Nut7 UL':false, 'Nut8':false, 'Nut8 LL':false, 'Nut8 UL':false, 'Nut9':false, 'Nut9 LL':false, 'Nut9 UL':false,
            'Nut10':false, 'Nut10 LL':false, 'Nut10 UL':false,
          },
        },
      };
      return <Line {...config} />;
};

export default Station30Analysis;

