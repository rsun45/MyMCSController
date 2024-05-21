import React from 'react';
import { Column } from '@ant-design/plots';

const BarChartComp = ({barChartData, xTitle, yTitle, barColor, baselineValue}) => {

  let annotations = [];
  if (baselineValue) {
    annotations = [
      // baseline - Design Cycle
      {
        type: 'text',
        position: ['min', baselineValue],
        content: 'Design Cycle',
        offsetY: -4,
        style: {
          fill: '#F4664A',
          textBaseline: 'bottom',
          stroke: 'white',
          lineWidth: 2,
        },
      },
      {
        type: 'line',
        start: ['min', baselineValue],
        end: ['max', baselineValue],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
    ];
  }

  const config = {
    data: barChartData,
    xField: xTitle,
    yField: yTitle,
    label: {
      position: 'top', // Show labels at the middle of bars
      style: {
        fill: '#333333', // Label text color
      },
      adjustPosition: true,
      offsetY:10,
    },
    color: barColor?barColor:"#5c87ff",
    // scrollbar: {
    //   type: 'horizontal',
    // },
    // slider: {
    //   start: 0,
    //   end: 1,
    // },

    annotations,
    
  };

  return <Column {...config} />;
};

export default BarChartComp;