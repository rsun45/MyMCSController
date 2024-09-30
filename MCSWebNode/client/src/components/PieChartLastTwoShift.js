import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartLastTwoShift = ({pieToggleDrawer, setShiftData, refresh}) => {

  const [data, setData] = React.useState([]);
  const [shiftName, setShiftName] = React.useState("");

  React.useEffect(() => {                               
    fetch("/api/LastTwoShiftPassFailCountsQuick")                           
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

  // const data = [
  //   {
  //     type: 'Pass',
  //     value: 70,
  //   },
  //   {
  //     type: 'Fail',
  //     value: 3,
  //   },
  // ];
  const config = {
    appendPadding: 10,
    padding: 'auto',
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6, //环状
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
    //colorField: 'type', // 部分图表使用 seriesField
    color: [ '#2ca02c', '#d62728'], //调整环状图颜色
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 20,
        },
        content: 'Last Two: ' + shiftName, //环状图中间的显示
      },
    },
    legend: {
      position: 'right',
      // offsetX: 10,
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
    }
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
        setShiftData([{"id": "1", "tagName": "nut2", "rejectCount": 1}, {"id": "2", "tagName": "nut3", "rejectCount": 2}]);
        pieToggleDrawer();
      }
    });
  }} 
  />;
};

export default PieChartLastTwoShift;

