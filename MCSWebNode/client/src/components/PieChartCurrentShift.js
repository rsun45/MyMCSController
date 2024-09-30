import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartCurrentShift = ({pieToggleDrawer, setShiftData, refresh}) => {

  const [data, setData] = React.useState([]);
  const [shiftName, setShiftName] = React.useState("");

  React.useEffect(() => {                               
    fetch("/api/CurrentShiftPassFailCountsQuick")                           
        .then((res) => res.json())                 
        .then((data) => {
          let tempData = [
            {
              type: 'Pass',
              value: data[0].pass_cnt,
            },
            {
              type: 'Fail',
              value: data[0].reject_cnt,
            },
          ]
          setData(tempData);
          setShiftName(data[0].shift);
        });             
    }, [refresh]);


  // data formate
  // const data = [
  //   {
  //     type: 'Pass',
  //     value: 49,
  //   },
  //   {
  //     type: 'Fail',
  //     value: 1,
  //   },
  // ];

  const config = {
    appendPadding: 10,
    padding: 'auto',
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
        fontSize: 24,
      },
      autoRotate: false,
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
          fontSize: 20,
        },
        content: 'Current: ' + shiftName,
      },
    },
    legend: {
      position: 'right',
      // offsetX: 10,
      // layout: 'vertical',
      // itemWidth: 170,
      maxWidthRatio:0.5,
      itemName:{
        formatter: (text, item) => {
          const items = data.filter((d) => d.type === item.value);
          return items.length ? items[0].type + " : " + items[0].value : text;
        },
        style: {
          fontSize: 18,
        },
      },
      // itemValue: {
      //   formatter: (text, item) => {
      //     const items = data.filter((d) => d.type === item.value);
      //     console.log(items);
      //     // return items.length ? items.reduce((a, b) => a + b.value, 0) / items.length : '-';
      //     return items.length ? "-" + items[0].value : text;
      //   },
      //   style: {
      //     fontSize: 20,
      //   },
      // },
    }
  };
  return <Pie 
  {...config}  
  onReady={(plot) => {
    plot.on('element:click', (evt) => {
      const { x, y } = evt;
      // const { xField } = plot.options;
      const tooltipData = plot.chart.getTooltipItems({ x, y });
      // console.log(tooltipData);
      // console.log("in toggle");
      if (tooltipData[0].name == 'Fail') {
        setShiftData([{"id": "1", "tagName": "nut3", "rejectCount": 1}]);
        pieToggleDrawer();
      }
    });
  }}
  />;
};

export default PieChartCurrentShift;

