import React from 'react';
import { Column } from '@ant-design/plots';

const BarChartComp = ({barChartData, xTitle, yTitle}) => {

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
    // scrollbar: {
    //   type: 'horizontal',
    // },
    // slider: {
    //   start: 0,
    //   end: 1,
    // },
    
  };

  return <Column {...config} />;
};

export default BarChartComp;