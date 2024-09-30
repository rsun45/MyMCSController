import * as React from 'react';
import { Column } from '@ant-design/plots';


export default function OperatorSummaryTimes( {refresh} ) {                    // props这里可以代表所有传过来的信息，然后用props.去调取。注意名字要和传过来的时候一致


  const [data, setData] = React.useState([]);

  React.useEffect(() => {                               
    fetch("/api/OperatorSummaryTimesQuick")                           
        .then((res) => res.json())                 
        .then((data) => {
          // console.log(data);
          let resultData = [];
          for (const it of data){
            for (const key in it){
              let temp = {};
              if (key !== 'Hour' && typeof(it[key])==="number"){
                temp['Hour'] = ""+it['Hour'];
                temp['name'] = key;
                temp['time'] = Math.round(it[key]*100)/100;
                resultData.push(temp);
              }
            }
          }
          // console.log(resultData);
          setData([...resultData]);
        });             
  }, [refresh]);


  const config = {
    data,
    isGroup: true,
    xField: 'Hour',
    yField: 'time',
    seriesField: 'name',

    /** 设置颜色 */
    color: ['#8d32a8', '#e68f1e', '#42a832', '#2d29ab', '#edd21f', '#d41923', '#196dd4'],

    
    label: {
      position: 'top', // Show labels at the middle of bars
      style: {
        fill: '#333333', // Label text color
        stroke: 'white',
        lineWidth: 2,
      },
      adjustPosition: true,
      offsetY:15,
    },
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: true,
      },
    },
  };


  return (
    <div style={{ height: '90%',  width: '100%'}}>

      <Column {...config} />;


    </div>
  );
  
}

