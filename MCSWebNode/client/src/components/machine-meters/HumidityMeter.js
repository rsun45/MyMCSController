import React, { useState, useEffect, useRef } from 'react';
import { Liquid } from '@ant-design/plots';
import Box from '@mui/material/Box';

const HumidityMeter = () => {
  const graphRef = useRef(null);
    useEffect(() => {
      if (graphRef.current) {
        let dataArr = [0.07, 0.09, 0.1, 0.11, 0.11, 0.1, 0.12, 0.14];
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
    percent: 0.10,
    outline: {
      border: 4,
      distance: 2,
    },
    wave: {
      length: 50,
    },
    statistic: {
      content: {
        // offsetY: -10,
        style: {
          fontSize: '20px',
          color: '#000000',
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
      <Liquid {...config} />
    </div>
);
  

};

export default HumidityMeter;