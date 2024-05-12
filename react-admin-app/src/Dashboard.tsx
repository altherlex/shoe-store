import { useState, useEffect } from 'react';
import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title as TitlePage } from 'react-admin';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
// TODO: Investigate issues with MUI + Vite
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// ----------- Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const mocked_data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 830),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => 245),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
// ----------- Chart

// const Dashboard = () => {
//   const [data, setData] = useState({});

//   const fetchDashboardData = () => {
//     fetch(import.meta.env.VITE_SIMPLE_REST_URL+'/dashboard')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error))
//       .finally( () => {
//         setTimeout( fetchDashboardData, 500 );
//       });      
//   }
//   useEffect(() => {
//     fetchDashboardData()
//   }, []);  

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid xs={6} md={8}>
//           <Item>
//             <Line options={options} data={mocked_data}/>
//           </Item>
//         </Grid>
//         <Grid xs={6} md={4}>
//           <Item>
//             <Line options={options} data={mocked_data} />        
//           </Item>
//         </Grid>

//         <Grid xs={6} md={4}>
//           <Item>
//           <CardContent>{JSON.stringify(data.total)} Inventories</CardContent>
//           </Item>
//         </Grid>
//         <Grid xs={4}>
//           <Item>
//           </Item>
//         </Grid>
//         <Grid xs={4}>
//           <Item>
//           </Item>
//         </Grid>
//       </Grid>  
//     </Box>
//   )
// };
// export default Dashboard;

// ------------
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

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6} md={8}>
            <Item>
              <Line options={options} data={mocked_data}/>
            </Item>
          </Grid>
          <Grid xs={6} md={4}>
            <Item>
              <Line options={options} data={mocked_data} />        
            </Item>
          </Grid>

          <Grid xs={6} md={4}>
            <Item>
            <CardContent>{JSON.stringify(this.state.data.total)} Inventories</CardContent>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <CardContent>{JSON.stringify(Object.keys(this.state.data.shoe_group).length)} Shoes type</CardContent>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <CardContent>{JSON.stringify(Object.keys(this.state.data.store_group).length)} Stores</CardContent>
            </Item>
          </Grid>
        </Grid>  
      </Box>
    )
  }
};
export default Dashboard;