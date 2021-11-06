import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import { Typography } from '@material-ui/core';

const AvgTaskerTime=()=>{

    const [ chartData, setChartData ] = useState([])
    const [ data, setData ] = useState({})

    const getData = async () => {
        let [tempChartData,labels,series] = [[],[],[]]
        let response = await fetch(`https://sdi05-03.staging.dso.mil/api/taskers/avgtimetask`)
        let data = await response.json()
        console.log(data)
        data.forEach(element => {
            labels.push(element.name)
            series.push(element.avg_duration)
        });

        setData({
            labels: labels,
            series: [ series  ]   })
    }

      var options = {
        horizontalBars: true,
        axisX: {
            showLabel:true
        }
      };
  
      var type = 'Bar';
      var aspectRatio = 'ct-octave';

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
            <Typography variant="h6" color="primary">Average Tasker by Time(days)</Typography>
            <ChartistGraph data={data} options={options} type={type} />
        </>
    )
}

export default AvgTaskerTime