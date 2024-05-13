import { useState, useEffect } from 'react';
import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title as TitlePage } from 'react-admin';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false, data: null };
  }  
  
  fetchData(this) {
    fetch(import.meta.env.VITE_SIMPLE_REST_URL+'/dashboard')
      .then(response => response.json())
      .then(json => this.setState({loaded: true, data: json}))
      .catch(error => console.error(error))
      .finally( () => {
        setTimeout( this.fetchData(this), 500 );
      });
  }    

  componentDidMount() {
    this.fetchData(this);
  }    

  render () {
    if ( !this.state.loaded ) {
      return false;
    }

    const linedata_per_sale = {
      labels: this.state.data.group.latest_sale.map(function(item){ return item.date }),
      datasets: [
        {
          label: 'Total Sales',
          data: this.state.data.group.latest_sale.map(function(item){ return item.sales_number }),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ]
    }

    const piedata_per_store = {
      labels: Object.keys(this.state.data.consolidate.store_group),
      datasets: [
        {
          label: 'sales per store',
          data: Object.values(this.state.data.consolidate.store_group),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const bardata_labels = Object.keys(this.state.data.consolidate.shoe_group);
    const bardata_per_shoes = {
      labels: bardata_labels,
      datasets: [
        {
          label: 'Total of Shoes Sold',
          data: Object.values(this.state.data.consolidate.shoe_group),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ],
    };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 6, md: 12 }}>
          <Grid xs={2} md={4}>
            <Item>
            <CardContent>{JSON.stringify(this.state.data.consolidate.total)} Inventories</CardContent>
            </Item>
          </Grid>
          <Grid xs={2} md={4}>
            <Item>
              <CardContent>{JSON.stringify(Object.keys(this.state.data.consolidate.shoe_group).length)} Shoes type</CardContent>
            </Item>
          </Grid>
          <Grid xs={2} md={4}>
            <Item>
              <CardContent>{JSON.stringify(Object.keys(this.state.data.consolidate.store_group).length)} Stores</CardContent>
            </Item>
          </Grid> 
          <Grid xs={6} md={8}>
            <Item>
              <Line options={options} data={linedata_per_sale}/>
            </Item>
          </Grid>
          <Grid xs={6} md={4}>
            <Item>
              <Pie data={piedata_per_store} />
            </Item>
          </Grid>
          <Grid xs={6} md={8}>
            <Item>
            <Bar options={options} data={bardata_per_shoes} />
            </Item>
          </Grid>
        </Grid> 
      </Box>
    )
  }
};
export default Dashboard;