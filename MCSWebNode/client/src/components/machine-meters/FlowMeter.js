import React, { useState, useEffect, useRef } from 'react';
import { Gauge } from '@ant-design/plots';

const FlowMeter = () => {
  const graphRef = useRef(null);
    useEffect(() => {
      if (graphRef.current) {
        let dataArr = [ 5, 5, 5, 5, 10, 10, 10, 10, 15, 20, 20, 25, 25, 30, 35, 35, 40, 40, 40, 45, 45, 45, 45, 50];
        for (let i=0; i< dataArr.length; i++){
          dataArr[i] = dataArr[i]/50;
        }
        const interval = setInterval(() => {
          // if (data >= 1.5) {
          //   clearInterval(interval);
          // }
  
          let data = dataArr[Math.floor(Math.random() * dataArr.length)];
          graphRef.current.changeData(data);
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [graphRef]);

  const config = {
    percent: 0.1,
    radius: 0.95,
    autoFit: true,
    range: {
      color: 'rgb(142, 230, 255)',
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    axis: {
      label: {
        formatter(v) {
          return Number(v) * 50;
        },
      },
      // subTickLine: {
      //   count: 3,
      // },
    },
    statistic: {
      // title: {
      //   offsetY: 20,
      //   style: {
      //     fontSize: '16px',
      //     color: '#4B535E',
      //   },
      //   formatter: () => 'Voltage',
      // },
      content: {
        formatter: ({ percent }) => `${(percent * 50).toFixed(0)}m³/min`,
        style: {
          color: 'rgb(0, 0, 0)',
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
    },

    onReady: (plot) => {
      graphRef.current = plot;
    },

  };
  return (
    <div style={{ height: '100%', }}>
      <Gauge {...config} />;
    </div>
  )
  

};

export default FlowMeter;