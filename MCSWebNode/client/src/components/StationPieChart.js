import React from 'react';
import { Pie } from '@ant-design/plots';

const StationPieChart = ({dataToPaint}) => {

  
  
  const config = {
    appendPadding: 10,
    data: dataToPaint,
    angleField: 'value',
    colorField: 'status',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    color: [ '#2ca02c', '#d62728'],
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    annotations: [
      {
        type: 'text',
        content: dataToPaint[0].tag,

        /** 位置 */
        position: ['50%', '0%'],

        /** 图形样式属性 */
        style: {
          fontSize: 20,
          fontWeight: 'bold',
        },

        /** x 方向的偏移量 */
        offsetX: -25,

        /** y 方向的偏移量 */
        offsetY: 0,
      },
    ],
    

  };
  return <Pie {...config} />;
};

export default StationPieChart;

