import React, { useState, useEffect } from 'react';
import { Mix } from '@ant-design/plots';

const DemoMix = () => {
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
    for (let i = 0; i < data.msg.length; i++){
      if (mp.has(data.msg[i].tag_cont))
        mp.set(data.msg[i].tag_cont, mp.get(data.msg[i].tag_cont) + 1)
      else{
        mp.set(data.msg[i].tag_cont, 1)
      }
    }
    const iterator1 = mp[Symbol.iterator]();
    let arr = []
    
    for (const item of iterator1) {
      arr.push({count: item[1], tag_cont: item[0]})
    }
    
    const config = {
      // 关闭 chart 上的 tooltip，子 view 开启 tooltip
      tooltip: false,
      plots: [
        /*
        {
          type: 'bar',
          region: {
            start: {
              x: 0,
              y: 0,
            },
            end: {
              x: 0.45,
              y: 0.45,
            },
          },
          options: {
            data: data.bar,
            xField: 'count',
            yField: 'area',
            seriesField: 'cat',
            isStack: true,
            tooltip: {
              shared: true,
              showCrosshairs: false,
              showMarkers: false,
            },
            label: {},
            interactions: [
              {
                type: 'active-region',
              },
            ],
          },
        },
        */
        {
          type: 'pie',
          options: {
            appendPadding: 10,
            data: arr,
            angleField: 'count',                       //根据这个数据表示扇形大小
            colorField: 'tag_cont',                 //扇形区域的名字
            tooltip: {
                showMarkers: false,
              },
            radius: 0.9,                            //扇形图半径
            label: {
              type: 'inner',
              formatter: '{name}',
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
              // 后续开放
              // {
              //   type: 'association-tooltip',
              //   cfg: {
              //     start: [
              //       {
              //         trigger: 'element:mousemove',
              //         action: 'association:showTooltip',
              //         arg: {
              //           dim: 'x',
              //           linkField: 'area',
              //         },
              //       },
              //     ],
              //   },
              // },
              // {
              //   type: 'association-highlight',
              //   cfg: {
              //     start: [
              //       {
              //         trigger: 'element:mousemove',
              //         action: 'association:highlight',
              //         arg: {
              //           linkField: 'area',
              //         },
              //       },
              //     ],
              //   },
              // },
            ],
          },
        },
        /*
        {
          type: 'area',
          region: {
            start: {
              x: 0,
              y: 0.5,
            },
            end: {
              x: 1,
              y: 0.95,
            },
          },
          options: {
            data: data.line,
            xField: 'time',
            yField: 'value',
            seriesField: 'area',
            line: {},
            point: {
              style: {
                r: 2.5,
              },
            },
            meta: {
              time: {
                range: [0, 1],
              },
            },
            smooth: true,
            tooltip: {
              showCrosshairs: true,
              shared: true,
            },
          },
        },
        */
      ],
    };
  
    return <Mix {...config} />;
  }
  export default DemoMix;