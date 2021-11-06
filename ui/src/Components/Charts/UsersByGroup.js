import React, { useState, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import { Typography } from '@material-ui/core';

export default function UsersByGroups() {
 const [usersPerGroup, setUsersPerGroup] = useState([]);

 function getList() {
  fetch(`https://sdi05-03.staging.dso.mil/api/groups/userspergroup`)
   .then(res => res.json())
   .then(json => setUsersPerGroup(json))
   .catch(err => alert(err.message))
 }

 useEffect(() => {
  getList()
 }, [])

 const groups = usersPerGroup.map(el => el.name)
 const count = usersPerGroup.map(el => el.count)
 const highest = usersPerGroup.reduce((max, el) =>  {if (el.count > max) max = el.count}, 0)
 
 const data = {
  labels: groups,
  series: [
   count
  ]
 };

 const options = {
  high: highest,
  low: 0,
 };

 var type = 'Bar'

 return (
  <div>
   <Typography variant="h6" color="primary">Users in group</Typography>
   <ChartistGraph className="chart" data={data} options={options} type={type} />
  </div>
 )
}