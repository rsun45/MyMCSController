import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartCurrentShift = () => {
  const data = [
    {
      type: 'Pass',
      value: 49,
    },
    {
      type: 'Fail',
      value: 1,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    colorField: 'type', // 部分图表使用 seriesField
    color: [ '#2ca02c', '#d62728'],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 25,
        },
        content: 'Current Shift',
      },
    },
  };
  return <Pie {...config} />;
};

export default PieChartCurrentShift;

