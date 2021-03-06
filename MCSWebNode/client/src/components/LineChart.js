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