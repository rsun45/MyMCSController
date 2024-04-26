import React from 'react';
import { Column } from '@ant-design/plots';

const BarChartComp = ({barChartData, xTitle, yTitle}) => {

  const config = {
    data: barChartData,
    xField: xTitle,
    yField: yTitle,
    // scrollbar: {
    //   type: 'horizontal',
    // },
    slider: {
      start: 0,
      end: 1,
    },
    
  };

  return <Column {...config} />;
};

export default BarChartComp;