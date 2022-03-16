import React, { useState, useEffect } from 'react';
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

