import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const PowerRecordsChart = () => {
  // ✅ 初始数据（时间戳格式）
  const [data, setData] = useState(() => [
    { time: new Date('2024-01-01 00:00:00').getTime(), value: 160 },
    { time: new Date('2024-01-01 00:00:03').getTime(), value: 200 },
  ]);

  // ✅ 生成新数据（基于最新的 data 状态）
  const generateNewData = (lastTime) => {
    const newTime = lastTime + 3000; // 递增 3 秒
    const newValue = Math.random() * 110 + 120;
    return { time: newTime, value: newValue };
  };

  // ✅ 正确更新数据（使用函数式更新）
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastTime = prevData[prevData.length - 1].time; // 从最新数据获取时间
        const newData = generateNewData(lastTime);
        return [...prevData, newData].slice(-20); // 保留最近20个数据
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []); // 依赖项为空，无需重复创建定时器

  // 图表配置（同上）
  const config = {
    data,
    xField: 'time',
    yField: 'value',
    animation: false,
    color: '#30BF78',
    xAxis: {
      type: 'cat',
      label: {
        formatter: (time) => {
          const myDate = new Date(Number(time));
          const hours = myDate.getHours().toString().padStart(2, '0');
          const minutes = myDate.getMinutes().toString().padStart(2, '0');
          const seconds = myDate.getSeconds().toString().padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        },
      },
    },
  };

  return <Line {...config} />;
};

export default PowerRecordsChart;