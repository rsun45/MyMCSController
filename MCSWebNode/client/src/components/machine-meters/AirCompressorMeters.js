import React, { useState, useEffect, useRef } from 'react';
import { Gauge } from '@ant-design/plots';

const AirCompressorMeters = () => {

  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#F4664A', '#FAAD14', '#30BF78'];
  const graphRef = useRef(null);
  useEffect(() => {
    if (graphRef.current) {
      let data = 0.7;
      const interval = setInterval(() => {
        // if (data >= 1.5) {
        //   clearInterval(interval);
        // }

        data += 0.05;
        graphRef.current.changeData(data > 1 ? data - 1 : data);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [graphRef]);
  const config = {
    percent: 0.5,
    radius: 0.95,
    // height: 120,
    autoFit: true,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
      width: 12,
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
    statistic: {
      title: {
        formatter: ({ percent }) => {
          return (Math.round(percent * 100) / 100).toFixed(2);
        },
        style: ({ percent }) => {
          return {
            fontSize: '20px',
            lineHeight: 1,
            color: "#000",
            fontWeight: 'bold',
          };
        },
      },
      // content: {
      //   offsetY: 25,
      //   style: {
      //     fontSize: '16px',
      //     color: '#4B535E',
      //   },
      //   formatter: () => 'Flow',
      // },
    },
    onReady: (plot) => {
      graphRef.current = plot;
    },
  };



  return (
    <div style={{ height: '100%', }}>
      <Gauge {...config} />
    </div>
  );
  

};

export default AirCompressorMeters;