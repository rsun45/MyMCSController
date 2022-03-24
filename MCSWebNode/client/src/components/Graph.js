/* import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
    const [data, setData] = useState({});
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch("/api/fakeData02")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    if (!Object.keys(data).length) {
      return null;
    }

    //计每一个tag_cont有几个数
    let mp = new Map()
    for (let i = 0; i < data.length; i++){
      if (mp.has(data[i].tag_cont))
        mp.set(data[i].tag_cont, mp.get(data[i].tag_cont) + 1)
      else{
        mp.set(data[i].tag_cont, 1)
      }
    }
    const iterator1 = mp[Symbol.iterator]();
    let arr = []
    
    for (const item of iterator1) {
      arr.push({count: item[1], tag_cont: item[0]})
    }

    const config = {
      appendPadding: 10,
      data: arr,
      angleField: 'count',
      colorField: 'tag_cont',
      radius: 0.9,
      legend: {
        layout: 'vertical',
        position: 'right',
      },
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
        
      },
      interactions: [
        {
          type: 'element-active',
        },
      ],
    };
    
    return <Pie {...config} />;
  }
  export default DemoPie;

 */

/*
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('/api/fakeData02')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  //排除tag_cont中的其他异常数据
  let maxV = 0
  for (let i = 0; i < data.length; i++){
      //data中tag_cont输出的是字符串类型 -> 转换成数字类型
      data[i].tag_cont = parseFloat(data[i].tag_cont)
      //更改时间显示
      let str1
      let str2
      str1 = data[i].tag_add_dt.substr(0, data[i].tag_add_dt.indexOf("T"))
      str2 = data[i].tag_add_dt.substr(data[i].tag_add_dt.indexOf("T") + 1, data[i].tag_add_dt.length)
      data[i].tag_add_dt = `${str1} 
${str2}`
      console.log(data[i])
      //返回的数值最大是多少？暂时设了一个1000。目前maxV是21.81
      if (data[i].tag_cont > maxV && data[i].tag_cont < 1000){
        maxV = data[i].tag_cont
      }
  }
  
  //排除异常数据
  function filterByTag(item){
    if (item.tag_cont <= maxV && item.tagName !== "Reject")
      return true;
    else
      return false;
  }
  const arr = data.filter(filterByTag)

  const config = {
    data: arr,
    xField: 'tag_add_dt',
    yField: 'tag_cont',
    seriesField: 'tagName',
    yAxis: {
        //可以再调整
        //min: -1,
        //max: 25, 
        tickCount: 5,
    },
    xAxis: {
      //可以再调整
      tickCount: 10,
    },
    legend: {
      layout: 'vertical',
      position: 'left',
    }
    
  };

  return <Line {...config} />;
};

export default DemoLine;
*/

import React from 'react';
import { Mix } from '@ant-design/plots';

const DemoMix = () => {

  const lastMin = [
    {
      type: 'Success',
      value: 90,
    },
    {
      type: 'Fail',
      value: 7,
    },
  ];

  const lastHour = [
    {
      type: 'Success',
      value: 90,
    },
    {
      type: 'Fail',
      value: 8,
    },
  ];

  const lastDay = [
    {
      type: 'Success',
      value: 90,
    },
    {
      type: 'Fail',
      value: 4,
    },
  ];

  const lastMonth = [
    {
      type: 'Success',
      value: 90,
    },
    {
      type: 'Fail',
      value: 3,
    },
  ];

  const config = {
    height: 700,
    padding: 'auto',
    tooltip: {
      showMarkers: false,
    },

    views: [
      //1st
      {
        data: lastMin,
        region: {
          start: {
            x: -0.3,
            y: 0.5,
          },
          end: {
            x: 0.5,
            y: 1,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
            innerRadius: 0.6,
            label: {
              type: 'inner',
              offset: '-50%',
              content: '1',
              style: {
                textAlign: 'center',
                fontSize: 14,
                },
            },
          },
        },
        axes: {
          value: {
            title: {
              text: 'Current Day',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },


      //2nd
      {
        data: lastHour,
        region: {
          start: {
            x: 0.5,
            y: 0.5,
          },
          end: {
            x: 0.75,
            y: 1,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
            innerRadius: 0.6,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Current Hour',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
      //3rd
      {
        data: lastDay,
        region: {
          start: {
            x: 0.2,
            y: 0.5,
          },
          end: {
            x: 0.5,
            y: 1,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
            innerRadius: 0.6,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Last Day',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
      //4th
      {
        data: lastMonth,
        region: {
          start: {
            x: 0.76,
            y: 0.5,
          },
          end: {
            x: 1.01,
            y: 1,
          },
        },

        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
            innerRadius: 0.6,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Last Hour',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
    ],
  };
  return <Mix {...config} />;
};

export default DemoMix;

