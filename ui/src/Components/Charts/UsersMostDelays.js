import React, { useEffect, useState } from 'react';
import ChartistGraph from 'react-chartist';
import { Typography } from '@material-ui/core';

const compare=(a, b)=>{
    if( a.delays < b.delays){
        return 1
    }
    if( a.delays > b.delays){
        return -1
    }
    return 0
}

const UsersMostDelays=()=>{

    //const [ data, setData ] = useState([])
    const [ chartData, setChartData ] = useState([])
    const [ data, setData ] = useState({})

    const getData = async () => {
        let [tempChartData,labels,series] = [[],[],[]]
        let response = await fetch(`https://sdi05-03.staging.dso.mil/api/users/currentoverdue`)
        let data = await response.json()
        data.forEach(element => {
            if( tempChartData.length === 0){
                tempChartData.push({ username: element.user_name, delays: 1})
            } else {
                let foundUser = false
                tempChartData.forEach( (ele, index) => {
                    if( ele.username === element.user_name ){
                        tempChartData[index].delays = tempChartData[index].delays + 1
                        foundUser = true
                    }
                })
                if( !foundUser ){
                    tempChartData.push({ username: element.user_name, delays: 1}) 
                }
            }
  
        })
        tempChartData.sort(compare)
        setChartData(tempChartData)
        tempChartData.forEach(el =>{
            labels.push(el.username)
            series.push(el.delays)
        })
        setData({
            labels: labels,
            series: [ series  ]   })
    }

      var options = {
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
            <Typography variant="h6" color="primary">Users by most delays</Typography>
            <ChartistGraph data={data} options={options} type={type} />
        </>
    )
}

export default UsersMostDelays