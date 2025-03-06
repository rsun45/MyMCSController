import React, { useState, useEffect, useRef } from 'react';
import { Gauge } from '@ant-design/plots';

const PowerMeter = () => {
  const graphRef = useRef(null);
    useEffect(() => {
      if (graphRef.current) {
        let dataArr = [0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86];
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
    percent: 0.75,
    radius: 0.95,
    autoFit: true,
    range: {
      color: '#30BF78',
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
          return Number(v) * 280;
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
        formatter: ({ percent }) => `${(percent * 280).toFixed(0)}KW`,
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

export default PowerMeter;