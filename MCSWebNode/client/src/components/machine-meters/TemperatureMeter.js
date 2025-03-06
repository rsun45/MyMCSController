import React, { useState, useEffect, useRef } from 'react';
import { Bullet } from '@ant-design/charts';

const TemperatureMeter = () => {
  const graphRef = useRef(null);
  const data = [
    {
      title: 'temperature', // 表标题
      ranges: [0, 100], // 温度范围刻度
      measures: [74], // 当前温度（必须是数组）
      target: null, // 目标温度（可选）
    },
  ];

  useEffect(() => {
    if (graphRef.current) {
      let dataArr = [70, 71, 72, 72, 73, 73, 73, 74, 74, 74, 74, 75, 75, 75, 75, 75, 75, 76, 76, 76, 76, 77, 77, 77, 78, 78, 79];

      const interval = setInterval(() => {
        const randomValue = dataArr[Math.floor(Math.random() * dataArr.length)];
        const newData = [
          {
            title: 'temperature',
            ranges: [0, 100],
            measures: [randomValue], // 更新当前温度
            target: null,
          },
        ];
        graphRef.current.changeData(newData); // 更新图表数据
      }, 3000);

      return () => clearInterval(interval); // 清除定时器
    }
  }, [graphRef]);

  const config = {
    data,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    layout: 'vertical',
    color: {
      range: ['l(270) 0:#6568fc  1:#fa6466'],
      measure: '#dddddd',
      target: '#000',
    },
    xAxis: false,
    yAxis: true,
    tooltip: false,
    label: {
      measure: {
        position: 'top',
        style: {
          fontSize: 20,
          fill: '#000',
          fontWeight: 'bold',
        },
        formatter: (val) => `${val.measures} °C`, // 示例：+120万
      },
    },
    // legend: {
    //   custom: true,
    //   position: 'bottom',
    //   offsetY: 10,
    //   title: {
    //     text: 'Temperature °C',
    //     style: {
    //       fontSize: 16,
    //       fill: '#4B535E',
    //     },
    //   },
    //   items: [
    //     {
    //       marker: {
    //         symbol: 'square',
    //         style: {
    //           fill: '#5B8FF9',
    //           r: 0,
    //         },
    //       },
    //     },
    //   ],
    // },
    onReady: (plot) => {
      graphRef.current = plot; // 保存图表实例
    },
  };

  return (
    <div style={{ height: '100%', }}>
      <Bullet {...config} />
    </div>
  );
};

export default TemperatureMeter;