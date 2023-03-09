import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartYesterday = ({pieToggleDrawer, setShiftData}) => {
  const data = [
    {
      type: 'Pass',
      value: 96,
    },
    {
      type: 'Fail',
      value: 4,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    // colorField: 'type',
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
        content: 'Yesterday',
      },
    },
  };
  return <Pie 
  {...config} 
  onReady={(plot) => {
    plot.on('plot:click', (evt) => {
      const { x, y } = evt;
      // const { xField } = plot.options;
      const tooltipData = plot.chart.getTooltipItems({ x, y });
      // console.log(tooltipData);
      // console.log("in toggle");
      if (tooltipData[0].name == 'Fail') {
        setShiftData([{"id": "1", "tagName": "nut2", "rejectCount": 1}, {"id": "2", "tagName": "nut3", "rejectCount": 2}, {"id": "3", "tagName": "nut4", "rejectCount": 1}]);
        pieToggleDrawer();
      }
    });
  }}
  />;
};

export default PieChartYesterday;

