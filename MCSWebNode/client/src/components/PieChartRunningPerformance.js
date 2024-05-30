import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartRunningPerformance = ({refresh}) => {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {                               
    fetch("/api/RunningPerformance")                           
        .then((res) => res.json())                 
        .then((data) => {
          // console.log(data);
          for (const it of data){
            it.tag_cont_number = Number(it.tag_cont);
          }
          setData(data);
        });             
    }, [refresh]);

  const config = {
    appendPadding: 10,
    padding: 'auto',
    data,
    angleField: 'tag_cont_number',
    colorField: 'tag_name',
    radius: 1,
    innerRadius: 0.6, //环状
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 20,
      },
      autoRotate: false,
    },
    //colorField: 'type', // 部分图表使用 seriesField
    color: [ '#d62728', '#dbd10f', '#2ca02c' ], //调整环状图颜色
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
        content: 'Running Performance', //环状图中间的显示
      },
    },
    legend: {
      position: 'right',
      // offsetX: 10,
      // layout: 'horizontal',
      // flipPage: true,
      // itemWidth: 170,
      maxWidthRatio:0.5,
      itemName:{
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
    
    });
  }} 
  />;
};

export default PieChartRunningPerformance;

