import React from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import './barchart.css'

const options ={
    scales: {
  		xAxes: [{stacked: true}],
    	yAxes: [{
      	stacked: true,
      	ticks: {
        	beginAtZero: true 
         }
      }]
    }
}

 const data ={ 
    labels: ["Data1", "Data2", "Data3"],
    datasets:[
        {   
            label: 'protein',
            data: [40,20,30],
            backgroundColor: '#7eddb1',
            borderColor: "#F29220",
        },
        {   

            label: 'fats',
            data: [40,20,30],
            backgroundColor: '#3f51b5',
            borderColor: "#F29220",
        },
        {   

            label: 'carbs',
            data: [40,20,30],
            backgroundColor: '#c53255',
            borderColor: "#F29220",
        }
       ],      
 }


class BarChart extends React.Component {
    constructor(props) {
      super(props)  
    }
    

     
     render(){
       return  <Bar  data={data} options={options} />
     }


}

export default BarChart;